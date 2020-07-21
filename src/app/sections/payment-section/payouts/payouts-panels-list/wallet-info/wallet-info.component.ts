import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PayoutToolDetailsWalletInfo } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-wallet-info',
    templateUrl: 'wallet-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletInfoComponent {
    @Input() payoutTool: PayoutToolDetailsWalletInfo;

    constructor(private router: Router) {}

    goToWalletDetails(id) {
        this.router.navigate(['wallet', id]);
    }
}
