import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { PayoutToolDetailsWalletInfo } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-wallet-info',
    templateUrl: 'wallet-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletInfoComponent {
    @Input() payoutTool: PayoutToolDetailsWalletInfo;
}
