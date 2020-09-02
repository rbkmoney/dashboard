import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';

import { ShopBalanceService } from './shop-balance.service';

@Component({
    selector: 'dsh-shop-balance',
    templateUrl: 'shop-balance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopBalanceService],
})
export class ShopBalanceComponent implements OnDestroy {
    @Input() set shopID(shopID: string) {
        this.shopBalanceService.setShopId(shopID);
    }

    balance$ = this.shopBalanceService.balance$;

    constructor(private shopBalanceService: ShopBalanceService) {}

    ngOnDestroy() {
        this.shopBalanceService.destroy();
    }
}
