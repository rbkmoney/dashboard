import { Component, Input } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';
import { StatusViewInfo } from '../status-detail-item/status-detail-item.component';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent {
    @Input() payment: PaymentSearchResult;

    @Input() layoutGap = '20px';

    rrn = 627334568648;

    localePath = 'sections.paymentDetails.details';

    getStatusViewInfo(): StatusViewInfo {
        const statusEnum = PaymentStatus.StatusEnum;
        const statuses = this.localePath + '.statuses';
        let color: Color;
        let text: string;
        switch (this.payment.status) {
            case statusEnum.Processed:
                color = Color.success;
                text = statuses + '.processed';
                break;
            case statusEnum.Failed:
                color = Color.warn;
                text = statuses + '.failed';
                break;
            case statusEnum.Refunded:
                color = Color.success;
                text = statuses + '.refunded';
                break;
            case statusEnum.Cancelled:
                color = Color.warn;
                text = statuses + '.cancelled';
                break;
            case statusEnum.Captured:
                color = Color.pending;
                text = statuses + '.captured';
                break;
            case statusEnum.Pending:
                color = Color.pending;
                text = statuses + '.pending';
                break;
        }
        return { color, text };
    }
}
