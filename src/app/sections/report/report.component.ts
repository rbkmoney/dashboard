import { Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../constants';
import { ReportService } from './report.service';

@Component({
    selector: 'dsh-report-details',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.scss'],
    providers: [ReportService]
})
export class ReportComponent {
    report$ = this.reportService.report$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private reportService: ReportService) {}
}
