import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { concat, merge, Observable, of, Subject } from 'rxjs';
import { filter, mapTo, pluck, share, shareReplay, switchMap, switchMapTo, take } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { UrlShortenerService } from '../../../../../api';
import { InvoiceTemplateAndToken, LifetimeInterval } from '../../../../../api-codegen/capi';
import { ConfigService } from '../../../../../config';
import { filterError, filterPayload, progress, replaceError } from '../../../../../custom-operators';
import { InvoiceTemplateFormService } from '../invoice-template-form';

export class PaymentLinkArguments {
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

@Injectable()
export class PaymentLinkFormService {
    private createInvoiceTemplatePaymentLink$ = new Subject<void>();

    form = this.createForm();

    invoiceTemplatePaymentLink$: Observable<string>;
    errors$: Observable<any>;
    isLoading$: Observable<boolean>;

    constructor(
        private urlShortenerService: UrlShortenerService,
        private configService: ConfigService,
        private invoiceTemplateFormService: InvoiceTemplateFormService,
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
        const { value } = this.form;
        return this.urlShortenerService.shortenUrl(
            this.argsToUrl({
                ...value,
                invoiceTemplateID: invoiceTemplateAndToken.invoiceTemplate.id,
                invoiceTemplateAccessToken: invoiceTemplateAndToken.invoiceTemplateAccessToken.payload
            }),
            this.createDateFromLifetime(invoiceTemplateAndToken.invoiceTemplate.lifetime)
        );
    }

    private argsToUrl({ holdExpiration, ...paymentLinkParams }: PaymentLinkArguments) {
        const queryParamsStr = Object.entries({
            ...paymentLinkParams,
            ...(paymentLinkParams.paymentFlowHold ? { holdExpiration } : {})
        })
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

    private createForm() {
        return this.fb.group({
            name: '',
            description: '',
            email: ['', Validators.email],
            redirectUrl: '',
            bankCard: true,
            wallets: false,
            terminals: false,
            applePay: false,
            googlePay: false,
            samsungPay: false,
            paymentFlowHold: false,
            holdExpiration: HoldExpiration.cancel
        });
    }
}
