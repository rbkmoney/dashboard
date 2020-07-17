import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { combineLatest, concat, merge, Observable, of, Subject } from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    mapTo,
    pluck,
    share,
    shareReplay,
    switchMap,
    switchMapTo,
    take,
} from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { InvoiceService, InvoiceTemplatesService, UrlShortenerService } from '../../api';
import { BankCard, Invoice, InvoiceTemplateAndToken, LifetimeInterval, PaymentMethod } from '../../api-codegen/capi';
import { ConfigService } from '../../config';
import { filterError, filterPayload, progress, replaceError } from '../../custom-operators';

export class PaymentLinkParams {
    invoiceID?: string;
    invoiceAccessToken?: string;
    invoiceTemplateID?: string;
    invoiceTemplateAccessToken?: string;
    name?: string;
    description?: string;
    email?: string;
    redirectUrl?: string;
    paymentFlowHold?: boolean;
    holdExpiration?: string;
    terminals?: boolean;
    wallets?: boolean;
    bankCard?: boolean;
    mobileCommerce?: boolean;
    applePay?: boolean;
    googlePay?: boolean;
    samsungPay?: boolean;
}

export enum HoldExpiration {
    cancel = 'cancel',
    capture = 'capture',
}

const TokenProvider = BankCard.TokenProvidersEnum;

export enum Type {
    invoice,
    template,
}

@Injectable()
export class CreatePaymentLinkService {
    private create$ = new Subject<Type>();
    private changeTemplate$ = new Subject<InvoiceTemplateAndToken>();
    private changeInvoice$ = new Subject<Invoice>();

    form = this.createForm();

    get paymentMethodsFormGroup() {
        return this.form.controls.paymentMethods as FormGroup;
    }

    paymentLink$: Observable<string>;
    errors$: Observable<any>;
    isLoading$: Observable<boolean>;

    constructor(
        private urlShortenerService: UrlShortenerService,
        private configService: ConfigService,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private invoiceService: InvoiceService,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {
        const changeTemplate$ = this.changeTemplate$.pipe(
            filter((v) => !!v),
            distinctUntilChanged((x, y) => x.invoiceTemplate.id === y.invoiceTemplate.id),
            share()
        );
        const changeInvoice$ = this.changeInvoice$.pipe(
            filter((v) => !!v),
            distinctUntilChanged((x, y) => x.id === y.id),
            share()
        );

        const template$ = changeTemplate$.pipe(shareReplay(1));
        const invoice$ = changeInvoice$.pipe(shareReplay(1));

        const invoicePaymentLinkWithErrors$ = merge(
            this.create$.pipe(
                filter((type) => type === Type.template),
                switchMapTo(template$.pipe(take(1))),
                switchMap((invoiceTemplateAndToken) =>
                    this.shortenUrlByTemplate(invoiceTemplateAndToken).pipe(replaceError)
                )
            ),
            this.create$.pipe(
                filter((type) => type === Type.invoice),
                switchMapTo(invoice$.pipe(take(1))),
                switchMap((invoice) =>
                    combineLatest([
                        of(invoice),
                        this.invoiceService.createInvoiceAccessToken(invoice.id).pipe(pluck('payload')),
                    ])
                ),
                switchMap(([invoice, invoiceAccessToken]) =>
                    this.shortenUrlByInvoice(invoice, invoiceAccessToken).pipe(replaceError)
                )
            )
        ).pipe(share());

        this.paymentLink$ = invoicePaymentLinkWithErrors$.pipe(
            filterPayload,
            pluck('shortenedUrl'),
            switchMap((v) => concat(of(v), merge(this.form.valueChanges, changeTemplate$).pipe(take(1), mapTo('')))),
            shareReplay(1)
        );
        this.errors$ = invoicePaymentLinkWithErrors$.pipe(filterError, shareReplay(1));
        this.isLoading$ = progress(this.create$, invoicePaymentLinkWithErrors$).pipe(shareReplay(1));

        merge(
            template$.pipe(
                pluck('invoiceTemplate'),
                switchMap(({ id }) => this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID(id))
            ),
            invoice$.pipe(switchMap(({ id }) => this.invoiceService.getInvoicePaymentMethods(id)))
        ).subscribe((paymentMethods) => this.updatePaymentMethods(paymentMethods));

        merge(invoice$, template$).subscribe();
    }

    changeInvoice(invoice: Invoice) {
        this.changeInvoice$.next(invoice);
    }

    changeInvoiceTemplate(invoiceTemplateAndToken: InvoiceTemplateAndToken) {
        this.changeTemplate$.next(invoiceTemplateAndToken);
    }

    createByTemplate() {
        this.create$.next(Type.template);
    }

    createByInvoice() {
        this.create$.next(Type.invoice);
    }

    clear() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => this.form.patchValue(this.createForm().value));
    }

    private shortenUrlByTemplate(invoiceTemplateAndToken: InvoiceTemplateAndToken) {
        return this.urlShortenerService.shortenUrl(
            this.buildUrl({
                invoiceTemplateID: invoiceTemplateAndToken.invoiceTemplate.id,
                invoiceTemplateAccessToken: invoiceTemplateAndToken.invoiceTemplateAccessToken.payload,
            }),
            this.createDateFromLifetime(invoiceTemplateAndToken.invoiceTemplate.lifetime)
        );
    }

    private shortenUrlByInvoice(invoice: Invoice, invoiceAccessToken: string) {
        return this.urlShortenerService.shortenUrl(
            this.buildUrl({
                invoiceID: invoice.id,
                invoiceAccessToken,
            }),
            moment(invoice.dueDate).utc().format()
        );
    }

    private buildUrl(params: Partial<PaymentLinkParams>) {
        const queryParamsStr = Object.entries({ ...this.getPaymentLinkParamsFromFormValue(), ...params })
            .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&');
        return `${this.configService.checkoutEndpoint}/v1/checkout.html?${queryParamsStr}`;
    }

    private createDateFromLifetime(lifetime: LifetimeInterval) {
        return moment().add(moment.duration(lifetime)).utc().format();
    }

    private getPaymentLinkParamsFromFormValue(): PaymentLinkParams {
        const { holdExpiration, paymentMethods, ...paymentLinkParams } = this.form.value;
        return {
            ...paymentLinkParams,
            ...(paymentLinkParams.paymentFlowHold ? { holdExpiration } : {}),
            ...paymentMethods,
        };
    }

    private createForm() {
        return this.fb.group({
            name: '',
            description: '',
            email: ['', Validators.email],
            redirectUrl: '',
            paymentMethods: this.fb.group({
                bankCard: { value: true, disabled: true },
                wallets: { value: false, disabled: true },
                terminals: { value: false, disabled: true },
                mobileCommerce: { value: false, disabled: true },
                applePay: { value: false, disabled: true },
                googlePay: { value: false, disabled: true },
                samsungPay: { value: false, disabled: true },
            }),
            paymentFlowHold: false,
            holdExpiration: HoldExpiration.cancel,
        });
    }

    private updatePaymentMethods(paymentMethods: PaymentMethod[] = []) {
        const paymentMethodsControls = this.paymentMethodsFormGroup.controls;
        Object.values(paymentMethodsControls).forEach((c) => c.disable());
        paymentMethods.forEach((item) => {
            switch (item.method) {
                case 'BankCard':
                    const bankCard = item as BankCard;
                    paymentMethodsControls.bankCard.enable();
                    if (Array.isArray(bankCard.tokenProviders)) {
                        for (const provider of bankCard.tokenProviders) {
                            switch (provider) {
                                case TokenProvider.Applepay:
                                    paymentMethodsControls.applePay.enable();
                                    break;
                                case TokenProvider.Googlepay:
                                    paymentMethodsControls.googlePay.enable();
                                    break;
                                case TokenProvider.Samsungpay:
                                    paymentMethodsControls.samsungPay.enable();
                                    break;
                            }
                        }
                    }
                    break;
                case 'DigitalWallet':
                    paymentMethodsControls.wallets.enable();
                    break;
                case 'PaymentTerminal':
                    paymentMethodsControls.terminals.enable();
                    break;
                // TODO: update swag
                case 'MobileCommerce' as string:
                    paymentMethodsControls.mobileCommerce.enable();
                    break;
                default:
                    console.error(`Unhandled PaymentMethod - ${item.method}`);
                    break;
            }
        });
    }
}
