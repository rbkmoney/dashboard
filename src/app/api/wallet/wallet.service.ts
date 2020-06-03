import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, pluck, shareReplay } from 'rxjs/operators';

import { Wallet, WalletGrantRequest, WalletService as ApiWalletsService } from '../../api-codegen/wallet-api';
import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { genXRequestID } from '../utils';
import { WalletsSearchParams } from './wallets-search-params';

@Injectable()
export class WalletService {
    wallets$ = this.listWallets(1000).pipe(
        catchError(() => of({ result: [] })),
        pluck('result'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasWallets$ = this.listWallets(1).pipe(
        catchError(() => of({ result: [] })),
        pluck('result', 'length'),
        map((l) => l > 0),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private apiWalletsService: ApiWalletsService) {}

    getWalletByExternalID(externalID: string) {
        return this.apiWalletsService.getWalletByExternalID(genXRequestID(), externalID);
    }

    listWallets(limit: number, params?: WalletsSearchParams, continuationToken?: string) {
        return this.apiWalletsService.listWallets(
            genXRequestID(),
            limit,
            undefined,
            params?.identityID,
            params?.currencyID,
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
