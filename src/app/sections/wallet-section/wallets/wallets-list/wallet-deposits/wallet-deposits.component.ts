import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { ComponentChanges } from '@dsh/type-utils';

import { FetchWalletDepositsService } from './services';

@Component({
    selector: 'dsh-wallet-deposits',
    templateUrl: 'wallet-deposits.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchWalletDepositsService],
})
export class WalletDepositsComponent implements OnChanges {
    @Input() walletID: string;

    deposits$ = this.fetchWalletDepositsService.searchResult$;
    hasMore$ = this.fetchWalletDepositsService.hasMore$;
    isLoading$ = this.fetchWalletDepositsService.doAction$;
    errors$ = this.fetchWalletDepositsService.errors$;

    constructor(private fetchWalletDepositsService: FetchWalletDepositsService) {}

    ngOnChanges({ walletID }: ComponentChanges<WalletDepositsComponent>): void {
        if (walletID?.firstChange && walletID.currentValue) {
            this.fetchWalletDepositsService.search(this.walletID);
        }
    }

    fetchMore(): void {
        this.fetchWalletDepositsService.fetchMore();
    }
}
