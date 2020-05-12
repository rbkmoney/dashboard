import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { concat, merge, Observable, of, Subject } from 'rxjs';
import { filter, mapTo, pluck, share, shareReplay, switchMap, switchMapTo, take } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { InvoiceTemplatesService, UrlShortenerService } from '../../../../../api';
import { BankCard, InvoiceTemplateAndToken, LifetimeInterval, PaymentMethod } from '../../../../../api-codegen/capi';
import { ConfigService } from '../../../../../config';
import { filterError, filterPayload, progress, replaceError } from '../../../../../custom-operators';
import { InvoiceTemplateFormService } from '../invoice-template-form';

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
    applePay?: boolean;
    googlePay?: boolean;
    samsungPay?: boolean;
}

export enum HoldExpiration {
    cancel = 'cancel',
    capture = 'capture'
}

const TokenProvider = BankCard.TokenProvidersEnum;

@Injectable()
export class PaymentLinkFormService {
    private createInvoiceTemplatePaymentLink$ = new Subject<void>();

    form = this.createForm();

    get paymentMethodsFormGroup() {
        return this.form.controls.paymentMethods as FormGroup;
    }

    invoiceTemplatePaymentLink$: Observable<string>;
    errors$: Observable<any>;
    isLoading$: Observable<boolean>;

    constructor(
        private urlShortenerService: UrlShortenerService,
        private configService: ConfigService,
        private invoiceTemplateFormService: InvoiceTemplateFormService,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {
        const invoiceTemplatePaymentLinkWithErrors$ = this.createInvoiceTemplatePaymentLink$.pipe(
            switchMapTo(this.invoiceTemplateFormService.invoiceTemplateAndToken$.pipe(take(1))),
            switchMap(invoiceTemplateAndToken => this.shortenUrl(invoiceTemplateAndToken).pipe(replaceError)),
            share()
        );
        this.invoiceTemplatePaymentLink$ = invoiceTemplatePaymentLinkWithErrors$.pipe(
            filterPayload,
            pluck('shortenedUrl'),
            switchMap(v =>
                concat(
                    of(v),
                    merge(this.form.valueChanges, this.invoiceTemplateFormService.form.valueChanges).pipe(
                        take(1),
                        mapTo('')
                    )
                )
            ),
            shareReplay(1)
        );
        this.errors$ = invoiceTemplatePaymentLinkWithErrors$.pipe(filterError, shareReplay(1));
        this.isLoading$ = progress(this.createInvoiceTemplatePaymentLink$, invoiceTemplatePaymentLinkWithErrors$).pipe(
            shareReplay(1)
        );
        this.invoiceTemplateFormService.invoiceTemplateAndToken$
            .pipe(
                switchMap(({ invoiceTemplate: { id } }) =>
                    this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID(id)
                )
            )
            .subscribe(paymentMethods => this.updatePaymentMethods(paymentMethods));
    }

    create() {
        this.createInvoiceTemplatePaymentLink$.next();
    }

    clear() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter(r => r === 'confirm'))
            .subscribe(() => this.form.patchValue(this.createForm().value));
    }

    private shortenUrl(invoiceTemplateAndToken: InvoiceTemplateAndToken) {
        return this.urlShortenerService.shortenUrl(
            this.buildUrl({
                invoiceTemplateID: invoiceTemplateAndToken.invoiceTemplate.id,
                invoiceTemplateAccessToken: invoiceTemplateAndToken.invoiceTemplateAccessToken.payload
            }),
            this.createDateFromLifetime(invoiceTemplateAndToken.invoiceTemplate.lifetime)
        );
    }

    private buildUrl(params: Partial<PaymentLinkParams>) {
        const queryParamsStr = Object.entries({ ...this.getPaymentLinkParamsFromFormValue(), ...params })
            .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&');
        return `${this.configService.checkoutEndpoint}/v1/checkout.html?${queryParamsStr}`;
    }

    private createDateFromLifetime(lifetime: LifetimeInterval) {
        return moment()
            .add(moment.duration(lifetime))
            .utc()
            .format();
    }

    private getPaymentLinkParamsFromFormValue(): PaymentLinkParams {
        const { holdExpiration, paymentMethods, ...paymentLinkParams } = this.form.value;
        return {
            ...paymentLinkParams,
            ...(paymentLinkParams.paymentFlowHold ? { holdExpiration } : {}),
            ...paymentMethods
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
                applePay: { value: false, disabled: true },
                googlePay: { value: false, disabled: true },
                samsungPay: { value: false, disabled: true }
            }),
            paymentFlowHold: false,
            holdExpiration: HoldExpiration.cancel
        });
    }

    private updatePaymentMethods(paymentMethods: PaymentMethod[] = []) {
        const paymentMethodsControls = this.paymentMethodsFormGroup.controls;
        Object.values(paymentMethodsControls).forEach(c => c.disable());
        paymentMethods.forEach(item => {
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
                default:
                    console.error('Unhandled PaymentMethod');
                    break;
            }
        });
    }
}
