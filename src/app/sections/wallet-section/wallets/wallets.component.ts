import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { FetchWalletsService, WalletsExpandedIdManager } from './services';

@Component({
    templateUrl: 'wallets.component.html',
    styleUrls: ['wallets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchWalletsService, WalletsExpandedIdManager],
})
export class WalletsComponent implements OnInit {
    wallets$ = this.receiveWalletsService.searchResult$;
    hasMore$ = this.receiveWalletsService.hasMore$;
    lastUpdated$ = this.receiveWalletsService.lastUpdated$;
    isLoading$ = this.receiveWalletsService.isLoading$;
    expandedId$ = this.walletsExpandedIdManager.expandedId$;

    constructor(
        private receiveWalletsService: FetchWalletsService,
        private walletsExpandedIdManager: WalletsExpandedIdManager,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {
        this.receiveWalletsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('fetchWalletsError', null, 'wallets'), 'OK')
        );
    }

    ngOnInit(): void {
        this.receiveWalletsService.search({});
    }

    fetchMore(): void {
        this.receiveWalletsService.fetchMore();
    }

    refresh(): void {
        this.receiveWalletsService.refresh();
    }

    expandedIdChange(id: number): void {
        this.walletsExpandedIdManager.expandedIdChange(id);
    }
}
