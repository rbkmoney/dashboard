import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentFlow, PaymentSearchResult } from '../../../../api/capi/swagger-codegen';

const DATA: PaymentSearchResult[] = [
    {
        status: PaymentSearchResult.StatusEnum.Cancelled,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 350000000000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Captured,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDASDSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Failed,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDASDSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Pending,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDASDSADASDASDSADASDASDSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Processed,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDASDSADASDASDSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Refunded,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDASDSADASDASDSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Cancelled,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDASDSADASDASDSADASDASDSADASDASDSADASDASDSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Captured,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDASDSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Failed,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDAS'
    },
    {
        status: PaymentSearchResult.StatusEnum.Captured,
        id: 'DSAKDNAS321',
        invoiceID: 'DSDASDAS432',
        createdAt: new Date('2019-07-18T16:26:30Z'),
        amount: 35000,
        currency: 'RUB',
        payer: { payerType: '321321' },
        flow: { type: PaymentFlow.TypeEnum.PaymentFlowHold },
        statusChangedAt: new Date('2019-07-18T16:26:30Z'),
        shopID: 'DSADASDDSADASDASDSADASDASDSADASDASDSADASDAS  AS'
    }
];

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss']
})
export class PaymentsComponent {
    displayedColumns: string[] = ['amount', 'status', 'statusChanged', 'invoice', 'attributes', 'actions'];
    dataSource = new MatTableDataSource(DATA);
    localeBseDir = 'sections.operations.payments';

    search(paymentSearchFormValue: PaymentSearchFormValue) {
        console.log('Search!', paymentSearchFormValue);
    }
}
