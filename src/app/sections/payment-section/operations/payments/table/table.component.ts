import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { PaymentSearchResult } from '../../../../../api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-payments-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() data: MatTableDataSource<PaymentSearchResult>;

    displayedColumns: string[] = ['amount', 'status', 'statusChanged', 'invoice', 'attributes', 'actions'];
    localeBaseDir = 'sections.operations.payments.table';
}
