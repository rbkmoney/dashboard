import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Payout } from '../../../../api-codegen/capi';

@Component({
    selector: 'dsh-payout-panel',
    templateUrl: 'payout-panel.component.html',
    styleUrls: ['payout-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutPanelComponent {
    @Input() payout: Payout;
}
