import { Component, Input, OnInit } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    @Input() payment: PaymentSearchResult;

    statusColor: Color;
    statusText: string;

    private statuses = PaymentStatus.StatusEnum;

    ngOnInit() {
        this.initStatus();
    }

    private initStatus() {
        switch (this.payment.status) {
            case this.statuses.Processed:
                this.statusColor = Color.success;
                this.statusText = 'sections.paymentDetails.details.statuses.processed';
                break;
            case this.statuses.Failed:
                this.statusColor = Color.warn;
                this.statusText = 'sections.paymentDetails.details.statuses.failed';
                break;
            case this.statuses.Refunded:
                this.statusColor = Color.success;
                this.statusText = 'sections.paymentDetails.details.statuses.refunded';
                break;
            case this.statuses.Cancelled:
                this.statusColor = Color.warn;
                this.statusText = 'sections.paymentDetails.details.statuses.cancelled';
                break;
            case this.statuses.Captured:
                this.statusColor = Color.pending;
                this.statusText = 'sections.paymentDetails.details.statuses.captured';
                break;
            case this.statuses.Pending:
                this.statusColor = Color.pending;
                this.statusText = 'sections.paymentDetails.details.statuses.pending';
                break;
        }
    }

}
