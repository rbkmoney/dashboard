import { Component, Input } from '@angular/core';

import { CustomerPayer } from '../../../../api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-customer-payer',
    templateUrl: './customer-payer.component.html'
})
export class CustomerPayerComponent {
    @Input() customerPayer: CustomerPayer;

    localePath = 'sections.paymentDetails.payerDetails';
}
