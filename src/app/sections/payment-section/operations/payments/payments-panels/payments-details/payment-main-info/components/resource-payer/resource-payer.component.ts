import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaymentResourcePayer } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-resource-payer',
    templateUrl: './resource-payer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePayerComponent {
    @Input() payer: PaymentResourcePayer;
}
