import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { Wallet } from '../../../../api-codegen/wallet-api/swagger-codegen';
import { WalletService } from '../../../../api/wallet';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { LAYOUT_GAP } from '../../../constants';
import { ReceiveWalletsService } from '../receive-wallets.service';

@Component({
    selector: 'dsh-wallets-panels-list',
    templateUrl: 'wallets-panels-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsPanelsListComponent implements OnInit {
    wallets$ = this.receiveWalletsService.searchResult$;
    selectedIdx$ = this.receiveWalletsService.selectedIdx$;
    accounts = {};

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private receiveWalletsService: ReceiveWalletsService,
        private walletService: WalletService
    ) {}

    ngOnInit(): void {
        this.wallets$.subscribe((wallets: Wallet[]) => {
            wallets.forEach(({ id }) => {
                if (!this.accounts[id]) {
                    this.accounts[id] = this.walletService.getWalletAccount(id).pipe(shareReplay(SHARE_REPLAY_CONF));
                }
            });
        });
    }

    select(idx: number) {
        this.receiveWalletsService.select(idx);
    }
}
