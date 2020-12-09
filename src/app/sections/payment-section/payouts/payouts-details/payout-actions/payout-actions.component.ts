import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Payout } from '@dsh/api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-payout-actions',
    templateUrl: 'payout-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutActionsComponent {
    @Input() payout: Payout;
    @Output() createPayoutReport: EventEmitter<Payout> = new EventEmitter();
}
