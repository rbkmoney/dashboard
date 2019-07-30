import { Component, Input } from '@angular/core';
import moment from 'moment';

import { PaymentFlowHold } from '../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html'
})
export class HoldDetailsComponent {
    @Input() flowHold: PaymentFlowHold;

    @Input() layoutGap = '20px';

    localePath = 'sections.paymentDetails.holdDetails';

    isHoldExpired(date: string): boolean {
        return moment(date).diff(moment()) < 0;
    }
}
