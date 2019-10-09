import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'dsh-reports-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() data: MatTableDataSource<{
        formationType: string;
        createdAt: string;
        status: string;
        period: string;
        actions: string;
    }> = [{ formationType: 'aa', createdAt: 'aa', status: 'aa', period: 'aa', actions: 'aa' }] as any;

    displayedColumns: string[] = ['formationType', 'createdAt', 'status', 'period', 'actions'];
}
