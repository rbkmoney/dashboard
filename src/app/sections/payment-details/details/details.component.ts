import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PaymentSearchResult, PaymentStatus } from '../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';
import { StatusColor as Color } from '../../../theme-manager';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html'
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

    setInfo(status: PaymentStatus.StatusEnum) {
        const statusEnum = PaymentStatus.StatusEnum;
        switch (status) {
            case statusEnum.Processed:
                this.color = Color.success;
                this.status = 'processed';
                break;
            case statusEnum.Failed:
                this.color = Color.warn;
                this.status = 'failed';
                break;
            case statusEnum.Refunded:
                this.color = Color.neutral;
                this.status = 'refunded';
                break;
            case statusEnum.Cancelled:
                this.color = Color.warn;
                this.status = 'cancelled';
                break;
            case statusEnum.Captured:
                this.color = Color.pending;
                this.status = 'captured';
                break;
            case statusEnum.Pending:
                this.color = Color.pending;
                this.status = 'pending';
                break;
        }
    }
}
