import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { WalletAccount } from '@dsh/api-codegen/wallet-api';

import { LAYOUT_GAP } from '../../../../tokens';

@Component({
    selector: 'dsh-account',
    templateUrl: 'account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    @Input()
    account: WalletAccount;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
