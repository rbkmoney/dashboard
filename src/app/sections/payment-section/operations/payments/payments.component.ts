import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';

const DATA: PaymentSearchResult[] = [];

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
