import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PayoutToolDetailsWalletInfo } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-wallet',
    templateUrl: 'wallet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent {
    @Input() wallet: PayoutToolDetailsWalletInfo;

    constructor(private router: Router) {}

    goToWalletDetails(walletID: string): void {
        this.router.navigate(['wallet', walletID]);
    }
}
