import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Wallet } from '../../../api-codegen/wallet-api/swagger-codegen';
import { WalletService } from '../../../api/wallet';
import { FetchResult, PartialFetcher } from '../../partial-fetcher';

@Injectable()
export class ReceiveWalletsService extends PartialFetcher<Wallet, null> {
    private readonly searchLimit = 20;

    wallets$ = this.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    constructor(
        private walletService: WalletService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
    }

    protected fetch(continuationToken: string): Observable<FetchResult<Wallet>> {
        return this.walletService.listWallets(this.searchLimit, undefined, undefined, continuationToken);
    }
}
