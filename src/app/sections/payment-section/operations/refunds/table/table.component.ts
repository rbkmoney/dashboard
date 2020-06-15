import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { RefundsTableData } from './refunds-table-data';

@Component({
    selector: 'dsh-refunds-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss'],
})
export class TableComponent {
    @Input() data: MatTableDataSource<RefundsTableData>;

    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'shopName', 'actions'];

    constructor(private router: Router) {}

    goToPaymentDetails({ invoiceID, paymentID }: RefundsTableData) {
        this.router.navigate(['invoice', invoiceID, 'payment', paymentID]);
    }
}
