import { Component, Input, OnInit } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../api/capi/swagger-codegen';


@Component({
    selector: 'dsh-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss']
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
            amount: 1234500,
            currency: 'RUB',
            fee: 15000,
            rrn: 627334568648,
            flow: {
                type: 'PaymentFlowInstant'
            },
            payer: {
                payerType: 'kekus'
            },
            error: {
                code: 'ты пидор'
            },
            statusChangedAt: new Date(),
            makeRecurrent: false
        } as PaymentSearchResult;
    }
}
