import { Component, Input } from '@angular/core';

import { WalletAccount } from '../../../api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
    @Input() account: WalletAccount;
}
