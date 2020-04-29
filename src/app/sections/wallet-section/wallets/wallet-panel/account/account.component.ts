import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { WalletAccount } from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { LAYOUT_GAP } from '../../../../constants';

@Component({
    selector: 'dsh-account',
    templateUrl: 'account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
    @Input()
    account: WalletAccount;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
