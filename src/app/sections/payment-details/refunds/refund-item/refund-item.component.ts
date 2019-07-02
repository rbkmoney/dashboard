import { Component, Input, OnInit } from '@angular/core';

import { Refund, RefundStatus } from '../../../../api/capi/swagger-codegen';
import { Color } from '../../../../status';

@Component({
    selector: 'dsh-refund-item',
    templateUrl: './refund-item.component.html',
    styleUrls: ['./refund-item.component.scss']
})
export class RefundItemComponent implements OnInit {
    @Input() refund: Refund;

    statuses = RefundStatus.StatusEnum;

    statusColor: Color;
    statusText: string;

    constructor() {}

    ngOnInit() {
        this.initStatus();
    }

    private initStatus() {
        switch (this.refund.status) {
            case this.statuses.Succeeded:
                this.statusColor = Color.success;
                this.statusText = 'sections.paymentDetails.refunds.statuses.succeeded';
                break;
            case this.statuses.Failed:
                this.statusColor = Color.warn;
                this.statusText = 'sections.paymentDetails.refunds.statuses.failed';
                break;
            case this.statuses.Pending:
                this.statusColor = Color.pending;
                this.statusText = 'sections.paymentDetails.refunds.statuses.pending';
                break;
        }
    }
}
