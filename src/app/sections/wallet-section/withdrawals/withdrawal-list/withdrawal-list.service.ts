import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { WalletService } from '../../../../api/wallet';

@Injectable()
export class WithdrawalListService {
    wallets$ = this.walletService.wallets$.pipe(shareReplay(1));

    constructor(private walletService: WalletService) {}
}
