import { Component } from '@angular/core';

import { WalletDetailsService } from './wallet-details.service';

@Component({
    selector: 'dsh-wallet-details',
    templateUrl: 'wallet-details.component.html',
    styleUrls: ['wallet-details.component.scss'],
})
export class WalletDetailsComponent {
    wallet$ = this.walletDetailsService.wallet$;
    walletAccount$ = this.walletDetailsService.walletAccount$;
    isLoading$ = this.walletDetailsService.isLoading$;

    constructor(private walletDetailsService: WalletDetailsService) {}
}
