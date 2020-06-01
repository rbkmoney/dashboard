import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../../../constants';
import { ReceiveWalletsService } from '../receive-wallets.service';

@Component({
    selector: 'dsh-wallets-panels-list',
    templateUrl: 'wallets-panels-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsPanelsListComponent {
    wallets$ = this.receiveWalletsService.searchResult$;
    selectedIdx$ = this.receiveWalletsService.selectedIdx$;
    accounts$ = this.receiveWalletsService.accounts$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private receiveWalletsService: ReceiveWalletsService) {}

    select(idx: number) {
        this.receiveWalletsService.select(idx);
    }
}
