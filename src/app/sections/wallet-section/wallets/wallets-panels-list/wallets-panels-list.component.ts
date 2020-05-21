import { Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../../../constants';
import { ReceiveWalletsService } from '../receive-wallets.service';
import { WalletsPanelsListService } from './wallets-panels-list.service';

@Component({
    selector: 'dsh-wallets-panels-list',
    templateUrl: 'wallets-panels-list.component.html',
    providers: [WalletsPanelsListService],
})
export class WalletsPanelsListComponent {
    wallets$ = this.receiveWalletsService.searchResult$;
    selectedIdx$ = this.receiveWalletsService.selectedIdx$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private receiveWalletsService: ReceiveWalletsService,
        private walletsPanelsListService: WalletsPanelsListService
    ) {}

    select(idx: number) {
        this.receiveWalletsService.select(idx);
    }

    getAccount(walletID: string) {
        return this.walletsPanelsListService.getWalletAccount(walletID);
    }
}
