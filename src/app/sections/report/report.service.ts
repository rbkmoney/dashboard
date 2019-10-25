import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Report } from '../../api-codegen/anapi/swagger-codegen';
import { ReportsService } from '../../api/reports';

@Injectable()
export class ReportService {
    constructor(private route: ActivatedRoute, private reportSearchService: ReportsService) {}

    getReport(): Observable<Report> {
        return this.route.params.pipe(switchMap(({ reportID }) => this.reportSearchService.getReport(reportID)));
    }
}
