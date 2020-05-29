import { Injectable } from '@angular/core';
import { pluck, shareReplay } from 'rxjs/operators';

import { WalletService } from '../../../../api/wallet';

@Injectable()
export class WithdrawalListService {
    wallets$ = this.walletService.wallets$.pipe(pluck('result'), shareReplay(1));

    constructor(private walletService: WalletService) {}
}
