import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Payout } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-payout-row',
    templateUrl: 'payout-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutRowComponent {
    @Input() payout: Payout;
}
