import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { PaymentsTableData } from './payments-table-data';

@Component({
    selector: 'dsh-payments-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() data: MatTableDataSource<PaymentsTableData>;

    displayedColumns: string[] = ['amount', 'status', 'statusChanged', 'invoice', 'attributes', 'actions'];
    localeBaseDir = 'sections.operations.payments.table';
}
