import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ComponentChanges } from '@dsh/type-utils';

import { FetchWalletWithdrawalsService } from './services';

@Component({
    selector: 'dsh-wallet-withdrawals',
    templateUrl: 'wallet-withdrawals.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: SEARCH_LIMIT, useValue: 3 }, FetchWalletWithdrawalsService],
})
export class WalletWithdrawalsComponent implements OnChanges {
    @Input() walletID: string;

    withdrawals$ = this.fetchWalletDepositsService.searchResult$;
    hasMore$ = this.fetchWalletDepositsService.hasMore$;
    isLoading$ = this.fetchWalletDepositsService.doAction$;
    errors$ = this.fetchWalletDepositsService.errors$;

    constructor(private fetchWalletDepositsService: FetchWalletWithdrawalsService) {}

    ngOnChanges({ walletID }: ComponentChanges<WalletWithdrawalsComponent>): void {
        if (walletID?.firstChange && walletID.currentValue) {
            this.fetchWalletDepositsService.search(this.walletID);
        }
    }

    fetchMore(): void {
        this.fetchWalletDepositsService.fetchMore();
    }
}
