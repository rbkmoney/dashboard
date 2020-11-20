import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Account, Refund, RefundParams, Shop } from '../../../../api-codegen/capi/swagger-codegen';
import { AccountService } from '../../../../api/account';
import { RefundService } from '../../../../api/refund';
import { ApiShopsService } from '../../../../api/shop';

@Injectable()
export class CreateRefundService {
    constructor(
        private refundService: RefundService,
        private shopService: ApiShopsService,
        private accountService: AccountService
    ) {}

    createRefund(invoiceID: string, paymentID: string, params?: RefundParams): Observable<Refund> {
        return this.refundService.createRefund(invoiceID, paymentID, params);
    }

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
