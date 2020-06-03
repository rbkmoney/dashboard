import { Component } from '@angular/core';

import { WalletDetailsService } from './wallet-details.service';

@Component({
    selector: 'dsh-wallet-details',
    templateUrl: 'wallet-details.component.html',
    styleUrls: ['wallet-details.component.scss'],
    providers: [WalletDetailsService],
})
export class WalletDetailsComponent {
    wallet$ = this.walletDetailsService.wallet$;
    walletAccount$ = this.walletDetailsService.walletAccount$;
    isLoading$ = this.walletDetailsService.isLoading$;
    error$ = this.walletDetailsService.errors$;

    constructor(private walletDetailsService: WalletDetailsService) {}
}
