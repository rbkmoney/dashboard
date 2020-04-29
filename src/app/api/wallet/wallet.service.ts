import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { catchError, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { Wallet, WalletGrantRequest, WalletService as ApiWalletsService } from '../../api-codegen/wallet-api';
import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { genXRequestID } from '../utils';

@Injectable()
export class WalletService {
    hasWallets$ = of('start').pipe(
        switchMap(() =>
            this.listWallets(1).pipe(
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                    return throwError(`WalletService: ${this.transloco.translate('httpError')}`);
                })
            )
        ),
        pluck('result', 'length'),
        map(l => l > 0),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private apiWalletsService: ApiWalletsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    getWalletByExternalID(externalID: string) {
        return this.apiWalletsService.getWalletByExternalID(genXRequestID(), externalID);
    }

    listWallets(limit: number, identityID?: string, currencyID?: string, continuationToken?: string) {
        return this.apiWalletsService.listWallets(
            genXRequestID(),
            limit,
            undefined,
            identityID,
            currencyID,
            continuationToken
        );
    }

    createWallet(wallet: Wallet) {
        return this.apiWalletsService.createWallet(genXRequestID(), wallet, undefined);
    }

    getWallet(walletID: string) {
        return this.apiWalletsService.getWallet(genXRequestID(), walletID);
    }

    getWalletAccount(walletID: string) {
        return this.apiWalletsService.getWalletAccount(genXRequestID(), walletID);
    }

    issueWalletGrant(walletID: string, request: WalletGrantRequest) {
        return this.apiWalletsService.issueWalletGrant(genXRequestID(), walletID, request);
    }
}
