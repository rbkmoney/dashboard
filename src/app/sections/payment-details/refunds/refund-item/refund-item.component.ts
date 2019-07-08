import { Component, Input } from '@angular/core';

import { Refund, RefundStatus } from '../../../../api/capi/swagger-codegen';
import { Color } from '../../../../status';
import { StatusViewInfo } from '../../status-detail-item/status-detail-item.component';

@Component({
    selector: 'dsh-refund-item',
    templateUrl: './refund-item.component.html'
})
export class RefundItemComponent {
    @Input() refund: Refund;

    statuses = RefundStatus.StatusEnum;

    private localePath = 'sections.paymentDetails.refunds.refundItem';

    private getStatusViewInfo(): StatusViewInfo {
        const statuses = this.localePath + '.statuses';
        let color: Color;
        let text: string;
        switch (this.refund.status) {
            case this.statuses.Succeeded:
                color = Color.success;
                text = statuses + '.succeeded';
                break;
            case this.statuses.Failed:
                color = Color.warn;
                text = statuses + '.failed';
                break;
            case this.statuses.Pending:
                color = Color.pending;
                text = statuses + '.pending';
                break;
        }
        return { color, text };
    }
}
