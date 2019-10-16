import { Component } from '@angular/core';

import { ReportsService } from './reports.service';

@Component({
    selector: 'dsh-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss'],
    providers: [ReportsService]
})
export class ReportsComponent {
    reports$ = this.reportsService.searchResult$;

    constructor(private reportsService: ReportsService) {}
}
