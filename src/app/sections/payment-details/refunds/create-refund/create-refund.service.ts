import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RefundService } from '../../../../refund/refund.service';
import { ShopService } from '../../../../shop/shop.service';
import { AccountService } from '../../../../account/account.service';
import { Account, Refund, RefundParams, Shop } from '../../../../api/capi/swagger-codegen';

@Injectable()
export class CreateRefundService {
    constructor(
        private refundService: RefundService,
        private shopService: ShopService,
        private accountService: AccountService
    ) {}

    createRefund(invoiceID: string, paymentID: string, params?: RefundParams): Observable<Refund> {
        return this.refundService.createRefund(invoiceID, paymentID, params);
    }

    getMinorAmountFromString(amount: string): number {
        const numericalAmount = this.amountToNumber(amount);
        return numericalAmount > 0 ? this.getMinorAmount(numericalAmount) : undefined;
    }

    private getMinorAmount(amount: number): number {
        return Math.round(amount * 100);
    }

    private amountToNumber(amount: string): number {
        return Number(amount.replace(',', '.'));
    }

    getAccount(shopID: string): Observable<Account> {
        return this.getShopByID(shopID).pipe(switchMap(shop => this.getAccountByID(shop.account.settlementID)));
    }

    private getAccountByID(settlementID: number): Observable<Account> {
        return this.accountService.getAccountByID(settlementID);
    }

    private getShopByID(shopID: string): Observable<Shop> {
        return this.shopService.getShopByID(shopID);
    }
}
