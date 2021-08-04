import { Component, Input } from '@angular/core';

import { WalletAccount } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-account-info',
    templateUrl: 'account-info.component.html',
    styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
    @Input() account: WalletAccount;
}
