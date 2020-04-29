import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { WalletService } from '../../../../api/wallet';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class WalletPanelService {
    private getWalletAccount$: Subject<string> = new Subject();

    account$ = this.getWalletAccount$.pipe(
        switchMap(id =>
            this.walletService.getWalletAccount(id).pipe(
                catchError(err => {
                    console.error(err);
                    this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                    return [];
                })
            )
        ),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private walletService: WalletService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {
        this.account$.subscribe();
    }

    getWalletAccount(id: string) {
        this.getWalletAccount$.next(id);
    }
}
