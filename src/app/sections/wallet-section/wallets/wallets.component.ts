import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ReceiveWalletsService } from './receive-wallets.service';

@Component({
    templateUrl: 'wallets.component.html',
    styleUrls: ['wallets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceiveWalletsService],
})
export class WalletsComponent implements OnInit {
    wallets$ = this.receiveWalletsService.wallets$;
    hasMore$ = this.receiveWalletsService.hasMore$;
    isLoading$ = this.receiveWalletsService.isLoading$;
    isInit$ = this.receiveWalletsService.isInit$;

    constructor(private receiveWalletsService: ReceiveWalletsService) {}

    fetchMore() {
        this.receiveWalletsService.fetchMore();
    }

    ngOnInit(): void {
        this.receiveWalletsService.search({});
    }
}
