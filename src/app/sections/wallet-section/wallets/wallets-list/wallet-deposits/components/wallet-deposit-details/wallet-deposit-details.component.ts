import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Deposit } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-wallet-deposit-details',
    templateUrl: 'wallet-deposit-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletDepositDetailsComponent {
    @Input() deposit: Deposit;
}
