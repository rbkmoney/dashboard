import { Component, Input } from '@angular/core';

import { Report } from '../../../../api-codegen/anapi/swagger-codegen';
import { ReportsService } from '../reports.service';

@Component({
    selector: 'dsh-reports-list',
    templateUrl: 'reports-list.component.html',
})
export class ReportsListComponent {
    @Input() reports: Report[];

    selectedId$ = this.reportsService.selectedId$;

    constructor(private reportsService: ReportsService) {}

    select(id: number) {
        this.reportsService.select(id);
    }
}
