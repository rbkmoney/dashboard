import { Component } from '@angular/core';

import { ReportsService } from './reports.service';

@Component({
    selector: 'dsh-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss']
})
export class ReportsComponent {
    reports$ = this.reportsService.reports$;

    constructor(private reportsService: ReportsService) {}
}
