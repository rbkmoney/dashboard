import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Wallet, Withdrawal } from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { WithdrawalsService } from '../withdrawals.service';
import { WithdrawalsListService } from './withdrawals-list.service';

@Component({
    selector: 'dsh-withdrawals-list',
    templateUrl: 'withdrawals-list.component.html',
    styleUrls: ['withdrawals-list.component.scss'],
    providers: [WithdrawalsListService],
})
export class WithdrawalsListComponent {
    @Input() withdrawals: Withdrawal[];

    selectedId$ = this.withdrawalsService.selectedId$;

    constructor(private depositListService: WithdrawalsListService, private withdrawalsService: WithdrawalsService) {}

    getWallet(id): Observable<Wallet> {
        return this.depositListService.wallets$.pipe(map((wallets) => wallets.find((wallet) => wallet.id === id)));
    }

    select(id: number) {
        this.withdrawalsService.select(id);
    }
}
