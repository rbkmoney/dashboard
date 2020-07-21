import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import uuid from 'uuid';

import { PayoutsService, ShopService, WalletService } from '../../../../api';
import { PayoutParams } from '../../../../api-codegen/capi/swagger-codegen';
import { progress } from '../../../../custom-operators';

@Injectable()
export class CreatePayoutDialogService {
    private currentShopID$ = new Subject<string>();

    currentWallets$ = this.currentShopID$.pipe(switchMap(this.walletService.getWallet));

    isLoading$ = progress(this.currentShopID$, this.currentWallets$);

    payoutTools$ = this.currentShopID$.pipe(
        switchMap((shopID) => this.shopsService.shops$.pipe(map((shops) => shops.find(({ id }) => id === shopID)))),
        switchMap(({ contractID }) => this.payoutsService.getPayoutTools(contractID)),
        map((tools) => tools.filter((tool) => tool.details.detailsType === 'PayoutToolDetailsWalletInfo'))
    );

    hasPayoutTools$ = this.payoutTools$.pipe(map((tools) => !!tools.length));

    constructor(
        private walletService: WalletService,
        private shopsService: ShopService,
        private payoutsService: PayoutsService
    ) {}

    updateWalletID(id: string) {
        if (id) {
            this.currentShopID$.next(id);
        }
    }

    createPayout(shopID: string, payoutToolID: string, amount: number, currency: string) {
        const params: PayoutParams = {
            id: uuid(),
            shopID,
            payoutToolID,
            amount,
            currency,
        };
        return this.payoutsService.createPayout(params);
    }
}
