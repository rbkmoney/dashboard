import { Component, Input, OnInit } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api/capi/swagger-codegen';
import { StatusViewInfo } from '../status-details-item/status-details-item.component';
import { StatusColor as Color } from '../../../theme-manager';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
    @Input() payment: PaymentSearchResult;

    @Input() layoutGap = '10px';

    rrn = 123456789012;
    spid = 234232323242321;

    localePath = 'sections.paymentDetails.details';

    statusViewInfo: StatusViewInfo;

    ngOnInit() {
        this.statusViewInfo = this.getStatusViewInfo(this.payment.status, `common.paymentStatus`);
    }

    getStatusViewInfo(status: PaymentStatus.StatusEnum, localePath: string): StatusViewInfo {
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
