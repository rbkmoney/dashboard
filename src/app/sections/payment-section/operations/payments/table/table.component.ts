import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { PaymentsTableData } from './payments-table-data';

@Component({
    selector: 'dsh-payments-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss'],
})
export class TableComponent {
    @Input() data: MatTableDataSource<PaymentsTableData>;

    displayedColumns: string[] = ['amount', 'status', 'statusChanged', 'shopName', 'actions'];

    constructor(private router: Router) {}

    goToPaymentDetails({ invoiceID, paymentID }: PaymentsTableData) {
        this.router.navigate(['invoice', invoiceID, 'payment', paymentID]);
    }
}
