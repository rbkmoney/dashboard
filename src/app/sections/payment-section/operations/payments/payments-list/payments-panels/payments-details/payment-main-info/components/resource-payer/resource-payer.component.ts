import { Component, Input } from '@angular/core';

import { PaymentResourcePayer } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-resource-payer',
    templateUrl: './resource-payer.component.html',
})
export class ResourcePayerComponent {
    @Input() payer: PaymentResourcePayer;
}
