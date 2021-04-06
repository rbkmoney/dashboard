import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { WalletAccount } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-account',
    templateUrl: 'account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    @Input()
    account: WalletAccount;
}
