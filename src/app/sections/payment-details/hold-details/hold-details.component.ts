import { Component, Inject, Input } from '@angular/core';
import moment from 'moment';

import { PaymentFlowHold } from '../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html'
})
export class HoldDetailsComponent {
    @Input() flowHold: PaymentFlowHold;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    isHoldExpired(date: string): boolean {
        return moment(date).diff(moment()) < 0;
    }
}
