import { Component, Inject, Input } from '@angular/core';

import { Payer } from '../../../api/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';

// TODO add to swag
export enum PayerType {
    CustomerPayer = 'CustomerPayer',
    PaymentResourcePayer = 'PaymentResourcePayer',
    RecurrentPayer = 'RecurrentPayer'
}

@Component({
    selector: 'dsh-payer-details',
    templateUrl: './payer-details.component.html'
})
export class PayerDetailsComponent {
    @Input() payer: Payer;

    PayerType = PayerType;

    payerEmail: string;

    localePath = 'sections.paymentDetails.payerDetails';

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
