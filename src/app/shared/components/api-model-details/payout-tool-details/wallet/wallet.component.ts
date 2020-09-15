import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutToolDetailsWalletInfo } from '../../../../../api-codegen/capi';

@Component({
    selector: 'dsh-wallet',
    templateUrl: 'wallet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent {
    @Input() wallet: PayoutToolDetailsWalletInfo;
}
