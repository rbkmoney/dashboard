import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Withdrawal } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-wallet-withdrawal-details',
    templateUrl: 'wallet-withdrawal-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletWithdrawalDetailsComponent {
    @Input() withdrawal: Withdrawal;
}
