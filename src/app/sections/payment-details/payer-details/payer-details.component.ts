import { Component, Input } from '@angular/core';

import { Payer } from '../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-payer-details',
    templateUrl: './payer-details.component.html'
})
export class PayerDetailsComponent {
    @Input() payer: Payer;
}
