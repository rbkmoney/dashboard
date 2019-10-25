import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LAYOUT_GAP } from '../constants';
import { Report } from '../../api-codegen/anapi/swagger-codegen';
import { ReportService } from './report.service';

@Component({
    providers: [ReportService],
    templateUrl: 'report.component.html',
    selector: 'dsh-report-details',
    styleUrls: ['report.component.scss']
})
export class ReportComponent implements OnInit {
    report$: Observable<Report>;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private reportService: ReportService) {}

    ngOnInit(): void {
        this.report$ = this.reportService.getReport();
    }
}
