import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Report } from '../../../../api-codegen/anapi/swagger-codegen';
import { ShopInfo } from '../../operations/operators';
import { ReportsService } from '../reports.service';
import { ReportListService } from './report-list.service';

@Component({
    selector: 'dsh-report-list',
    templateUrl: 'report-list.component.html',
    providers: [ReportListService],
})
export class ReportListComponent {
    @Input() reports: Report[];

    selectedId$ = this.reportsService.selectedId$;

    constructor(private reportService: ReportListService, private reportsService: ReportsService) {}

    getShopInfo(shopID: string): Observable<ShopInfo> {
        return this.reportService.shopsInfo$.pipe(map((p) => p.find((s) => s.shopID === shopID)));
    }

    select(id: number) {
        this.reportsService.select(id);
    }
}
