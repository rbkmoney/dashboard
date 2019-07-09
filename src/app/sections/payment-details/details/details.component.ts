import { Component, Input } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';
import { StatusViewInfo } from '../status-detail-item/status-detail-item.component';
import { toCurrencySymbol } from '../currency-utils';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent {
    @Input() payment: PaymentSearchResult;

    rrn = 627334568648;

    localePath = 'sections.paymentDetails.details';

    toCurrencySymbol = toCurrencySymbol;

    private statuses = PaymentStatus.StatusEnum;

    getStatusViewInfo(): StatusViewInfo {
        const statuses = this.localePath + '.statuses';
        let color: Color;
        let text: string;
        switch (this.payment.status) {
            case this.statuses.Processed:
                color = Color.success;
                text = statuses + '.processed';
                break;
            case this.statuses.Failed:
                color = Color.warn;
                text = statuses + '.failed';
                break;
            case this.statuses.Refunded:
                color = Color.success;
                text = statuses + '.refunded';
                break;
            case this.statuses.Cancelled:
                color = Color.warn;
                text = statuses + '.cancelled';
                break;
            case this.statuses.Captured:
                color = Color.pending;
                text = statuses + '.captured';
                break;
            case this.statuses.Pending:
                color = Color.pending;
                text = statuses + '.pending';
                break;
        }
        return { color, text };
    }
}
