import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import {
    PaymentSearchResult,
    PaymentStatus,
    PaymentToolDetailsBankCard,
    PayoutToolDetailsBankCard
} from '../../api/capi/swagger-codegen';
import PaymentSystemEnum = PaymentToolDetailsBankCard.PaymentSystemEnum;

@Component({
    selector: 'dsh-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class PaymentDetailsComponent implements OnInit {
    @Input() payment: PaymentSearchResult;

    payoutToolDetailsBankCard: PayoutToolDetailsBankCard;

    ngOnInit() {
        this.payment = {
            status: PaymentStatus.StatusEnum.Processed,
            id: 'H3dg32Hd2',
            invoiceID: 'J3hd76G63bd2G',
            shopID: 'h83hd3s63b23f',
            createdAt: '2019-08-03T14:46:15Z' as any,
            amount: 1500000,
            currency: 'RUB',
            fee: 16500,
            flow: {
                type: 'PaymentFlowInstant'
            },
            payer: {
                payerType: 'PaymentResourcePayer',
                paymentResourcePayer: {},
                clientInfo: {
                    fingerprint: 'ca35b70d7582a867e415d22d018e18c7',
                    ip: '2A04:4A00:5:966:80E8:ACEC:D40:D5D5'
                },
                contactInfo: {
                    email: 'payer@mail.com'
                }
            },
            error: {
                code: 'Недостаточно средств'
            },
            statusChangedAt: '2019-07-08T14:46:15Z' as any,
            makeRecurrent: true
        } as PaymentSearchResult;

        this.payoutToolDetailsBankCard = {
            detailsType: 'PaymentToolDetailsBankCard',
            cardNumberMask: '847837******3457',
            paymentSystem: PaymentSystemEnum.Mastercard
        };
    }
}
