import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Account, Shop } from '@dsh/api-codegen/capi';
import { AccountService } from '@dsh/api/account';
import { ApiShopsService } from '@dsh/api/shop';

@Injectable()
export class AccountsService {
    constructor(private shopService: ApiShopsService, private accountService: AccountService) {}

    getAccount(shopID: string): Observable<Account> {
        return this.getShopByID(shopID).pipe(switchMap((shop) => this.getAccountByID(shop.account.settlementID)));
    }

    private getAccountByID(settlementID: number): Observable<Account> {
        return this.accountService.getAccountByID(settlementID);
    }

    private getShopByID(shopID: string): Observable<Shop> {
        return this.shopService.getShopByID(shopID);
    }
}
