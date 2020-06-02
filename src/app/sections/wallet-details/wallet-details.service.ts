import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { WalletService } from '../../api/wallet';
import { progress } from '../../custom-operators';

@Injectable()
export class WalletDetailsService {
    private walletID$ = this.route.params.pipe(pluck('walletID'));

    wallet$ = this.walletID$.pipe(switchMap((walletID) => this.walletService.getWallet(walletID)));

    walletAccount$ = this.walletID$.pipe(switchMap((walletID) => this.walletService.getWalletAccount(walletID)));

    isLoading$ = progress(this.walletID$, forkJoin([this.wallet$, this.walletAccount$]));

    constructor(private route: ActivatedRoute, private walletService: WalletService) {}
}
