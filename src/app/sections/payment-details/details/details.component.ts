import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';
import { StatusViewInfo } from '../status-details-item/status-details-item.component';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnChanges {
    @Input() payment: PaymentSearchResult;

    @Input() layoutGap = '10px';

    localePath = 'sections.paymentDetails.details';

    statusViewInfo: StatusViewInfo;

    ngOnChanges() {
        if (this.payment) {
            this.statusViewInfo = this.getStatusViewInfo(this.payment.status, `common.paymentStatus`);
        }
    }

    getStatusViewInfo(status: PaymentStatus.StatusEnum, localePath: string): StatusViewInfo {
        const statusEnum = PaymentStatus.StatusEnum;
        switch (status) {
            case statusEnum.Processed:
                return { color: Color.success, text: `${localePath}.processed` };
            case statusEnum.Failed:
                return { color: Color.warn, text: `${localePath}.failed` };
            case statusEnum.Refunded:
                return { color: null, text: `${localePath}.refunded` };
            case statusEnum.Cancelled:
                return { color: Color.warn, text: `${localePath}.cancelled` };
            case statusEnum.Captured:
                return { color: Color.success, text: `${localePath}.captured` };
            case statusEnum.Pending:
                return { color: Color.pending, text: `${localePath}.pending` };
        }
    }
}
