import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
import { ReceiveWalletsService } from './receive-wallets.service';

@Component({
    templateUrl: 'wallets.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsComponent implements OnInit {
    wallets$ = this.receiveWalletsService.wallets$;
    hasMore$ = this.receiveWalletsService.hasMore$;
    isLoading$ = this.receiveWalletsService.doAction$.pipe(booleanDebounceTime(100), shareReplay(SHARE_REPLAY_CONF));
    isInit$ = this.receiveWalletsService.isInit$;

    constructor(private receiveWalletsService: ReceiveWalletsService) {}

    fetchMore() {
        this.receiveWalletsService.fetchMore();
    }

    ngOnInit(): void {
        this.receiveWalletsService.search(null);
    }
}
