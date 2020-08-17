import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Report } from '../../../../api-codegen/anapi/swagger-codegen';
import { CancelReportService } from '../cancel-report';

@Component({
    selector: 'dsh-reports-list',
    templateUrl: 'reports-list.component.html',
})
export class ReportsListComponent implements OnInit, OnDestroy {
    @Input() reports: Report[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();
    @Output() refreshData: EventEmitter<void> = new EventEmitter();

    constructor(private cancelReportService: CancelReportService) {}

    cancelReport(reportID: number) {
        this.cancelReportService.cancelReport(reportID);
    }

    ngOnInit() {
        this.cancelReportService.init();
        this.cancelReportService.reportCancelled$.subscribe(() => this.refreshData.emit());
    }

    ngOnDestroy(): void {
        this.cancelReportService.destroy();
    }
}
