import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { WalletAccount } from '../../../../api-codegen/wallet-api/swagger-codegen';
import { WalletService } from '../../../../api/wallet';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class WalletsPanelsListService {
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
        // this.account$.subscribe();
    }

    getWalletAccount(id: string): Observable<WalletAccount> {
        return this.walletService.getWalletAccount(id).pipe(shareReplay(SHARE_REPLAY_CONF), catchError(err => {
            console.error(err);
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        }));
    }
}
