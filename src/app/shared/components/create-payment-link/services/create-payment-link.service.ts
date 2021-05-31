import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { FbGroupConfig } from '@ngneat/reactive-forms/lib/formBuilder';
import { progress } from '@rbkmoney/utils';
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

import { BankCard, Invoice, InvoiceTemplateAndToken, PaymentMethod, PaymentTerminal } from '@dsh/api-codegen/capi';
import { ShortenedUrl } from '@dsh/api-codegen/url-shortener';
import { InvoiceService } from '@dsh/api/invoice';
import { InvoiceTemplatesService } from '@dsh/api/invoice-templates';
import { UrlShortenerService } from '@dsh/api/url-shortener';
import { PaymentLinkParams } from '@dsh/app/shared/components/create-payment-link/types/payment-link-params';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { filterError, filterPayload, replaceError } from '@dsh/operators';

import { ConfigService } from '../../../../config';
import { HoldExpiration } from '../types/hold-expiration';
import { InvoiceType } from '../types/invoice-type';
import { ORDERED_PAYMENT_METHODS_NAMES } from '../types/ordered-payment-methods-names';
import { getDueDate } from '../utils/get-due-date';

import MethodEnum = PaymentMethod.MethodEnum;
import TokenProvidersEnum = BankCard.TokenProvidersEnum;
import ProvidersEnum = PaymentTerminal.ProvidersEnum;

type PaymentMethodFormData = { [N in typeof ORDERED_PAYMENT_METHODS_NAMES[number]]: boolean };

interface FormData {
    name: string;
    description: string;
    email: string;
    redirectUrl: string;
    paymentMethods: FormGroup<PaymentMethodFormData>;
    paymentFlowHold: boolean;
    holdExpiration: HoldExpiration;
}

@Injectable()
export class CreatePaymentLinkService {
    form = this.createForm();
    paymentLink$: Observable<string>;
    errors$: Observable<unknown>;
    isLoading$: Observable<boolean>;

    private create$ = new Subject<InvoiceType>();
    private changeTemplate$ = new Subject<InvoiceTemplateAndToken>();
    private changeInvoice$ = new Subject<Invoice>();

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
                filter((type) => type === InvoiceType.Template),
                switchMapTo(template$.pipe(take(1))),
                switchMap((invoiceTemplateAndToken) =>
                    this.shortenUrlByTemplate(invoiceTemplateAndToken).pipe(replaceError)
                )
            ),
            this.create$.pipe(
                filter((type) => type === InvoiceType.Invoice),
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

    changeInvoice(invoice: Invoice): void {
        this.changeInvoice$.next(invoice);
    }

    changeInvoiceTemplate(invoiceTemplateAndToken: InvoiceTemplateAndToken): void {
        this.changeTemplate$.next(invoiceTemplateAndToken);
    }

    createByTemplate(): void {
        this.create$.next(InvoiceType.Template);
    }

    createByInvoice(): void {
        this.create$.next(InvoiceType.Invoice);
    }

    clear(): void {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => this.form.reset(this.createForm().value));
    }

    private shortenUrlByTemplate(invoiceTemplateAndToken: InvoiceTemplateAndToken): Observable<ShortenedUrl> {
        return this.urlShortenerService.shortenUrl(
            this.buildUrl({
                invoiceTemplateID: invoiceTemplateAndToken.invoiceTemplate.id,
                invoiceTemplateAccessToken: invoiceTemplateAndToken.invoiceTemplateAccessToken.payload,
            }),
            getDueDate(invoiceTemplateAndToken.invoiceTemplate.lifetime).utc().format()
        );
    }

    private shortenUrlByInvoice(invoice: Invoice, invoiceAccessToken: string): Observable<ShortenedUrl> {
        return this.urlShortenerService.shortenUrl(
            this.buildUrl({
                invoiceID: invoice.id,
                invoiceAccessToken,
            }),
            moment(invoice.dueDate).utc().format()
        );
    }

    private buildUrl(params: PaymentLinkParams): string {
        const queryParamsStr = Object.entries({ ...this.getPaymentLinkParamsFromFormValue(), ...params })
            .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&');
        return `${this.configService.checkoutEndpoint}/v1/checkout.html?${queryParamsStr}`;
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
        return this.fb.group<FormData>({
            name: '',
            description: '',
            email: ['', Validators.email],
            redirectUrl: '',
            paymentMethods: this.fb.group<PaymentMethodFormData>(
                Object.fromEntries(
                    ORDERED_PAYMENT_METHODS_NAMES.map((name) => [name, { value: name === 'bankCard', disabled: true }])
                ) as FbGroupConfig<PaymentMethodFormData>
            ),
            paymentFlowHold: false,
            holdExpiration: HoldExpiration.Cancel,
        });
    }

    private updatePaymentMethods(paymentMethods: PaymentMethod[] = []) {
        const paymentMethodsControls = this.form.controls.paymentMethods.controls;
        Object.values(paymentMethodsControls).forEach((c) => c.disable());
        paymentMethods.forEach((item) => {
            switch (item.method) {
                case MethodEnum.BankCard: {
                    const bankCard = item as BankCard;
                    if (Array.isArray(bankCard.tokenProviders) && bankCard.tokenProviders.length) {
                        for (const provider of bankCard.tokenProviders) {
                            switch (provider) {
                                case TokenProvidersEnum.Applepay:
                                    paymentMethodsControls.applePay.enable();
                                    break;
                                case TokenProvidersEnum.Googlepay:
                                    paymentMethodsControls.googlePay.enable();
                                    break;
                                case TokenProvidersEnum.Samsungpay:
                                    paymentMethodsControls.samsungPay.enable();
                                    break;
                                case TokenProvidersEnum.Yandexpay:
                                    paymentMethodsControls.yandexPay.enable();
                                    break;
                                default:
                                    console.error(`Unhandled TokenProvider - ${provider}`);
                                    break;
                            }
                        }
                    } else {
                        paymentMethodsControls.bankCard.enable();
                    }
                    break;
                }
                case MethodEnum.DigitalWallet:
                    paymentMethodsControls.wallets.enable();
                    break;
                case MethodEnum.PaymentTerminal:
                    (item as PaymentTerminal).providers.forEach((p) => {
                        switch (p) {
                            case ProvidersEnum.Euroset:
                                paymentMethodsControls.euroset.enable();
                                break;
                            case ProvidersEnum.Qps:
                                paymentMethodsControls.qps.enable();
                                break;
                            case ProvidersEnum.Uzcard:
                                paymentMethodsControls.uzcard.enable();
                                break;
                            default:
                                console.error(`Unhandled PaymentTerminal provider - ${p}`);
                                break;
                        }
                    });
                    break;
                case MethodEnum.MobileCommerce:
                    paymentMethodsControls.mobileCommerce.enable();
                    break;
                default:
                    console.error(`Unhandled PaymentMethod - ${item.method}`);
                    break;
            }
        });
    }
}
