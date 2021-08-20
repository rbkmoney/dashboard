import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Withdrawal } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-withdrawal-row',
    templateUrl: 'withdrawal-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalRowComponent {
    @Input() withdrawal: Withdrawal;
}
