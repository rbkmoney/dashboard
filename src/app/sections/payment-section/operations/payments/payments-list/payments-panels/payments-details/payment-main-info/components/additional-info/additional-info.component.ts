import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Payment } from '../../../../../../types/payment';

@Component({
    selector: 'dsh-additional-info',
    templateUrl: 'additional-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent {
    @Input() payment: Payment;
}
