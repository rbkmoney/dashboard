import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Payout } from '@dsh/api-codegen/anapi/swagger-codegen';

import { CreatePayoutReportService } from '../create-payout-report';

@Component({
    selector: 'dsh-payouts-list',
    templateUrl: 'payouts-list.component.html',
})
export class PayoutsListComponent implements OnInit, OnDestroy {
    @Input() payouts: Payout[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();
    @Output() refreshData: EventEmitter<void> = new EventEmitter();

    constructor(private createPayoutReportService: CreatePayoutReportService) {}

    createPayoutReport(payout: Payout) {
        this.createPayoutReportService.createPayoutReport(payout);
    }

    ngOnInit() {
        this.createPayoutReportService.init();
    }

    ngOnDestroy(): void {
        this.createPayoutReportService.destroy();
    }
}
