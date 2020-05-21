import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LAYOUT_GAP } from '../constants';
import { ReportDetailsService } from './report-details.service';

@Component({
    templateUrl: 'report-details.component.html',
    styleUrls: ['report-details.component.scss'],
    providers: [ReportDetailsService],
})
export class ReportDetailsComponent implements OnInit {
    report$ = this.reportService.report$;
    reportError$ = this.reportService.reportError$;
    reportInitialized$ = this.reportService.reportInitialized$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private reportService: ReportDetailsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(({ reportID }) => this.reportService.initialize(reportID));
    }
}
