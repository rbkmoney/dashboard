import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ComponentChanges } from '@dsh/type-utils';

import { FetchWalletDepositsService } from '../../services';

@Component({
    selector: 'dsh-wallet-deposits-list',
    templateUrl: 'wallet-deposits-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: SEARCH_LIMIT, useValue: 3 }, FetchWalletDepositsService],
})
export class WalletDepositsListComponent implements OnChanges {
    @Input() walletID: string;

    deposits$ = this.fetchWalletDepositsService.searchResult$;
    hasMore$ = this.fetchWalletDepositsService.hasMore$;
    isLoading$ = this.fetchWalletDepositsService.doAction$;
    errors$ = this.fetchWalletDepositsService.errors$;

    constructor(private fetchWalletDepositsService: FetchWalletDepositsService) {}

    ngOnChanges({ walletID }: ComponentChanges<WalletDepositsListComponent>): void {
        if (walletID?.firstChange && walletID.currentValue) {
            this.fetchWalletDepositsService.search(this.walletID);
        }
    }

    fetchMore(): void {
        this.fetchWalletDepositsService.fetchMore();
    }
}
