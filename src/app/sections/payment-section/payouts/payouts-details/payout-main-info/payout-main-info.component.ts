import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Payout } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-payout-main-info',
    templateUrl: 'payout-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutMainInfoComponent {
    @Input() payout: Payout;
    @Input() shopName: string;
}
