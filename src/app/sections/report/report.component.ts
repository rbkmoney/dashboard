import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LAYOUT_GAP } from '../constants';
import { ReportService } from './report.service';

@Component({
    selector: 'dsh-report-details',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.scss'],
    providers: [ReportService]
})
export class ReportComponent implements OnInit {
    report$ = this.reportService.report$;
    reportError$ = this.reportService.reportError$;
    reportInitialized$ = this.reportService.reportInitialized$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private reportService: ReportService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(({ reportID }) => this.reportService.initialize(reportID));
    }
}
