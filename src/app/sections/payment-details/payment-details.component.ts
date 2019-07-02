import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { PaymentResourcePayer, PaymentSearchResult, PaymentStatus } from '../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class PaymentDetailsComponent implements OnInit {
    @Input() payment: PaymentSearchResult;

    ngOnInit() {
        this.payment = {
            status: PaymentStatus.StatusEnum.Processed,
            id: 'H3dg32Hd2',
            invoiceID: 'J3hd76G63bd2G',
            shopID: 'h83hd3s63b23f',
            createdAt: new Date(),
            amount: 1500000,
            currency: 'RUB',
            fee: 16500,
            rrn: 627334568648,
            flow: {
                type: 'PaymentFlowInstant'
            },
            payer: {
                payerType: 'PaymentResourcePayer',
                paymentResourcePayer: {
                    paymentToolDetails: {
                        cardNumberMask: '847837******3457'
                    }
                },
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
            statusChangedAt: new Date(),
            makeRecurrent: false
        } as PaymentSearchResult;
    }
}
