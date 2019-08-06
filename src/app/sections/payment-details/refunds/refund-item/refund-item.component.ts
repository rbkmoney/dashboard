import { Component, Inject, Input, OnChanges } from '@angular/core';

import { RefundSearchResult, RefundStatus } from '../../../../api/capi/swagger-codegen';
import { StatusViewInfo } from '../../status-details-item/status-details-item.component';
import { LAYOUT_GAP } from '../../../constants';
import { StatusColor } from '../../../../theme-manager';

@Component({
    selector: 'dsh-refund-item',
    templateUrl: './refund-item.component.html'
})
export class RefundItemComponent implements OnChanges {
    @Input() refund: RefundSearchResult;

    localePath = 'sections.paymentDetails.refunds.refundItem';

    statusViewInfo: StatusViewInfo;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges() {
        this.statusViewInfo = this.getStatusViewInfo(this.refund.status, `common.refundStatus`);
    }

    getStatusViewInfo(status: RefundStatus.StatusEnum, localePath: string): StatusViewInfo {
        const statusEnum = RefundStatus.StatusEnum;
        switch (status) {
            case statusEnum.Succeeded:
                return { color: StatusColor.success, text: `${localePath}.succeeded` };
            case statusEnum.Failed:
                return { color: StatusColor.warn, text: `${localePath}.failed` };
            case statusEnum.Pending:
                return { color: StatusColor.pending, text: `${localePath}.pending` };
        }
    }
}
