import { Injectable } from '@angular/core';

import { Wallet, WalletGrantRequest, WalletService as ApiWalletsService } from '../../api-codegen/wallet-api';
import { genXRequestID } from '../utils';

@Injectable()
export class WalletService {
    constructor(private apiWalletsService: ApiWalletsService) {}

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
