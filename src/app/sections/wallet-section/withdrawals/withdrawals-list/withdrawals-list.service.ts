import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { WalletService } from '@dsh/api/wallet';

@Injectable()
export class WithdrawalsListService {
    wallets$ = this.walletService.wallets$.pipe(shareReplay(1));

    constructor(private walletService: WalletService) {}
}
