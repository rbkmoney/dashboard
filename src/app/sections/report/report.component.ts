import { Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../constants';
import { ReportService } from './report.service';

@Component({
    providers: [ReportService],
    templateUrl: 'report.component.html',
    selector: 'dsh-report-details',
    styleUrls: ['report.component.scss']
})
export class ReportComponent {
    report$ = this.reportService.report$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private reportService: ReportService) {}
}
