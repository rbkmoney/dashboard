import { Component, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Report } from '../../../../api-codegen/anapi';
import { StatusColor } from '../../../../theme-manager';
import { ReportsService } from '../../../../api';
import { downloadAll } from '../../../../../utils';

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

    constructor(private reportsService: ReportsService) {}

    downloadReports(report: Report) {
        forkJoin(report.files.map(file => this.reportsService.downloadFile(report.id, file.id)))
            .pipe(map(links => links.map(({ url }) => url)))
            .subscribe(urls => downloadAll(urls));
    }
}
