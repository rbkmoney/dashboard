import { Component, Input } from '@angular/core';

import { Report } from '../../../../api-codegen/anapi';
import { StatusColor } from '../../../../theme-manager';

const Status = Report.StatusEnum;
type Status = Report.StatusEnum;

@Component({
    selector: 'dsh-reports-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() reports: Report[] = [];

    mapStatusToStatusColor = {
        [Status.Pending]: StatusColor.pending,
        [Status.Created]: StatusColor.success
    };

    displayedColumns: string[] = ['formationType', 'createdAt', 'status', 'period', 'actions'];
}
