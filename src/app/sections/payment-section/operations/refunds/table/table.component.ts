import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { RefundsTableData } from './refunds-table-data';

@Component({
    selector: 'dsh-refunds-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() data: MatTableDataSource<RefundsTableData>;

    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'invoiceID', 'paymentID', 'reason', 'actions'];
    localeBaseDir = 'sections.operations.refunds.table';
}
