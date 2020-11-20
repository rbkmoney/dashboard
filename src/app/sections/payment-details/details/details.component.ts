import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api-codegen/capi/swagger-codegen';
import { StatusColor as Color } from '../../../theme-manager';
import { LAYOUT_GAP } from '../../constants';
import { getPaymentStatusInfo } from '../../get-payment-status-info';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html',
})
export class DetailsComponent implements OnChanges {
    @Input() payment: PaymentSearchResult;

    color: Color;

    status: string;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.payment.currentValue !== changes.payment.previousValue) {
            this.setInfo(this.payment.status);
        }
    }

    setInfo(paymentStatus: PaymentStatus.StatusEnum) {
        const { color, status } = getPaymentStatusInfo(paymentStatus);
        this.color = color;
        this.status = status;
    }
}
