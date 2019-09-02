import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api-codegen/capi/swagger-codegen';
import { StatusViewInfo } from '../status-details-item';
import { LAYOUT_GAP } from '../../constants';
import { StatusColor as Color } from '../../../theme-manager';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnChanges {
    @Input() payment: PaymentSearchResult;

    localePath = 'sections.paymentDetails.details';

    statusViewInfo: StatusViewInfo;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.payment.currentValue !== changes.payment.previousValue) {
            this.statusViewInfo = this.getStatusViewInfo(this.payment.status);
        }
    }

    getStatusViewInfo(status: PaymentStatus.StatusEnum): StatusViewInfo {
        const localePath = `common.paymentStatus`;
        const statusEnum = PaymentStatus.StatusEnum;
        switch (status) {
            case statusEnum.Processed:
                return { color: Color.success, text: `${localePath}.processed` };
            case statusEnum.Failed:
                return { color: Color.warn, text: `${localePath}.failed` };
            case statusEnum.Refunded:
                return { color: Color.success, text: `${localePath}.refunded` };
            case statusEnum.Cancelled:
                return { color: Color.warn, text: `${localePath}.cancelled` };
            case statusEnum.Captured:
                return { color: Color.pending, text: `${localePath}.captured` };
            case statusEnum.Pending:
                return { color: Color.pending, text: `${localePath}.pending` };
        }
    }
}
