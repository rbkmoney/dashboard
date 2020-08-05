import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import uuid from 'uuid';

import { PayoutsService, ShopService, WalletService } from '../../../../api';
import { PayoutParams } from '../../../../api-codegen/capi/swagger-codegen';
import { progress } from '../../../../custom-operators';

@Injectable()
export class CreatePayoutDialogService {
    private currentShopID$ = new Subject<string>();

    currentWallets$ = this.currentShopID$.pipe(switchMap(this.walletService.getWallet), shareReplay(1));

    isLoading$ = progress(this.currentShopID$, this.currentWallets$).pipe(shareReplay(1));

    payoutTools$ = this.currentShopID$.pipe(
        switchMap((shopID) => this.shopsService.shops$.pipe(map((shops) => shops.find(({ id }) => id === shopID)))),
        switchMap(({ contractID }) => this.payoutsService.getPayoutTools(contractID)),
        map((tools) => tools.filter((tool) => tool.details.detailsType === 'PayoutToolDetailsWalletInfo')),
        shareReplay(1)
    );

    hasPayoutTools$ = this.payoutTools$.pipe(
        map((tools) => !!tools.length),
        shareReplay(1)
    );

    constructor(
        private walletService: WalletService,
        private shopsService: ShopService,
        private payoutsService: PayoutsService
    ) {
        merge(this.payoutTools$, this.hasPayoutTools$).subscribe();
    }

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
