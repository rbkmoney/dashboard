import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ComponentChanges } from '@dsh/type-utils';

import { FetchWalletWithdrawalsService } from '../../services';

@Component({
    selector: 'dsh-wallet-withdrawals-list',
    templateUrl: 'wallet-withdrawals-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: SEARCH_LIMIT, useValue: 3 }, FetchWalletWithdrawalsService],
})
export class WalletWithdrawalsListComponent implements OnChanges {
    @Input() walletID: string;

    withdrawals$ = this.fetchWalletWithdrawalsService.searchResult$;
    hasMore$ = this.fetchWalletWithdrawalsService.hasMore$;
    isLoading$ = this.fetchWalletWithdrawalsService.doAction$;
    errors$ = this.fetchWalletWithdrawalsService.errors$;

    constructor(private fetchWalletWithdrawalsService: FetchWalletWithdrawalsService) {}

    ngOnChanges({ walletID }: ComponentChanges<WalletWithdrawalsListComponent>): void {
        if (walletID?.firstChange && walletID.currentValue) {
            this.fetchWalletWithdrawalsService.search(this.walletID);
        }
    }

    fetchMore(): void {
        this.fetchWalletWithdrawalsService.fetchMore();
    }
}
