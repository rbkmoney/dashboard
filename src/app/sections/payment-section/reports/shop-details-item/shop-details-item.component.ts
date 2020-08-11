import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShopDetailsItemService } from './shop-details-item.service';

@Component({
    selector: 'dsh-shop-details-item',
    templateUrl: 'shop-details-item.component.html',
    providers: [ShopDetailsItemService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopDetailsItemComponent {
    @Input()
    set shopID(id: string) {
        this.shopDetailsItemService.setShopID(id);
    }

    shopName$ = this.shopDetailsItemService.shopName$;

    constructor(private shopDetailsItemService: ShopDetailsItemService) {}
}
