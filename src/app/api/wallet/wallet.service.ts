import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { of } from 'rxjs';
import { catchError, map, pluck, shareReplay } from 'rxjs/operators';

import { Wallet, WalletGrantRequest, WalletService as ApiWalletsService } from '@dsh/api-codegen/wallet-api';

import { SHARE_REPLAY_CONF } from '../../custom-operators';
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

    constructor(private apiWalletsService: ApiWalletsService, private idGenerator: IdGeneratorService) {}

    getWalletByExternalID(externalID: string) {
        return this.apiWalletsService.getWalletByExternalID(this.idGenerator.shortUuid(), externalID);
    }

    listWallets(limit: number, params?: WalletsSearchParams, continuationToken?: string) {
        return this.apiWalletsService.listWallets(
            this.idGenerator.shortUuid(),
            limit,
            undefined,
            params?.identityID,
            params?.currencyID,
            continuationToken
        );
    }

    createWallet(wallet: Wallet) {
        return this.apiWalletsService.createWallet(this.idGenerator.shortUuid(), wallet, undefined);
    }

    getWallet(walletID: string) {
        return this.apiWalletsService.getWallet(this.idGenerator.shortUuid(), walletID);
    }

    getWalletAccount(walletID: string) {
        return this.apiWalletsService.getWalletAccount(this.idGenerator.shortUuid(), walletID);
    }

    issueWalletGrant(walletID: string, request: WalletGrantRequest) {
        return this.apiWalletsService.issueWalletGrant(this.idGenerator.shortUuid(), walletID, request);
    }
}
