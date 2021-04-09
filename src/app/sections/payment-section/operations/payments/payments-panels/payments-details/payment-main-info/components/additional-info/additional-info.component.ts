import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaymentAdditionalInfo } from '../../types/payment-additional-info';

@Component({
    selector: 'dsh-additional-info',
    templateUrl: 'additional-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent {
    @Input() info: PaymentAdditionalInfo;
}
