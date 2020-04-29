import { Injectable } from '@angular/core';
import moment from 'moment';
import { Subject } from 'rxjs';
import { pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { UrlShortenerService } from '../../../../../api';
import { InvoiceTemplateAndToken, LifetimeInterval } from '../../../../../api-codegen/capi';
import { ConfigService } from '../../../../../config';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
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

@Injectable()
export class PaymentLinkFormService {
    private createInvoiceTemplatePaymentLinkParams$ = new Subject<PaymentLinkArguments>();

    invoiceTemplatePaymentLink$ = this.createInvoiceTemplatePaymentLinkParams$.pipe(
        withLatestFrom(this.invoiceTemplateFormService.invoiceTemplateAndToken$),
        switchMap(([params, invoiceTemplateAndToken]) =>
            this.urlShortenerService.shortenUrl(
                this.createUrl(params, invoiceTemplateAndToken),
                this.createDateFromLifetime(invoiceTemplateAndToken.invoiceTemplate.lifetime)
            )
        ),
        pluck('shortenedUrl'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private urlShortenerService: UrlShortenerService,
        private configService: ConfigService,
        private invoiceTemplateFormService: InvoiceTemplateFormService
    ) {}

    createInvoiceTemplatePaymentLink(params: PaymentLinkArguments) {
        this.createInvoiceTemplatePaymentLinkParams$.next(params);
    }

    private createUrl(params: PaymentLinkArguments, invoiceTemplateAndToken: InvoiceTemplateAndToken) {
        const args = params;
        args.invoiceTemplateID = invoiceTemplateAndToken.invoiceTemplate.id;
        args.invoiceTemplateAccessToken = invoiceTemplateAndToken.invoiceTemplateAccessToken.payload;
        return this.argsToUrl(args);
    }

    private argsToUrl(paymentLinkArgs: PaymentLinkArguments) {
        const args = Object.entries(paymentLinkArgs)
            .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&');
        return `${this.configService.checkoutEndpoint}/v1/checkout.html?${args}`;
    }

    private createDateFromLifetime(lifetime: LifetimeInterval): any {
        return moment()
            .add(moment.duration(lifetime))
            .utc()
            .format();
    }
}
