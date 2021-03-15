import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Deposit, Wallet } from '@dsh/api-codegen/wallet-api';

import { FetchWalletsService } from '../../services/fetch-wallets.service';

@Component({
    selector: 'dsh-deposit-row',
    templateUrl: 'deposit-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchWalletsService],
})
export class DepositRowComponent {
    @Input() deposit: Deposit;

    constructor(private fetchWalletsService: FetchWalletsService) {}

    getWallet(id): Observable<Wallet> {
        return this.fetchWalletsService.wallets$.pipe(map((wallets) => wallets.find((wallet) => wallet.id === id)));
    }
}
