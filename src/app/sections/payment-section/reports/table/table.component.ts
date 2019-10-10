import { Component, Input } from '@angular/core';

import { Report } from '../../../../api-codegen/anapi';
import { StatusColor } from '../../../../theme-manager';

@Component({
    selector: 'dsh-reports-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() reports: Report[] = [];

    mapStatusToStatusColor = {
        [Report.StatusEnum.Pending]: StatusColor.pending,
        [Report.StatusEnum.Created]: StatusColor.success
    };

    displayedColumns: string[] = ['formationType', 'createdAt', 'status', 'period', 'actions'];
}
