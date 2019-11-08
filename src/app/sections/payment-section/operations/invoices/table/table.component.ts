import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { InvoicesTableData } from './invoices-table-data';

@Component({
    selector: 'dsh-invoices-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() data: MatTableDataSource<InvoicesTableData>;

    displayedColumns: string[] = ['invoiceID', 'amount', 'status', 'createdAt', 'shop', 'actions'];

    constructor(private router: Router) {}

    goToInvoiceDetails({ invoiceID }: InvoicesTableData) {
        this.router.navigate(['invoice', invoiceID]);
    }
}
