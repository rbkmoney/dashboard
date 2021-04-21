import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';

import { Category } from '@dsh/api-codegen/capi/swagger-codegen';

import { isShopLocationUrl, ShopItem } from '../../../../types/shop-item';
import { CategoryService } from '../../services/category/category.service';

@Component({
    selector: 'dsh-shop-info',
    templateUrl: 'shop-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopInfoComponent {
    @Input()
    get shop(): ShopItem {
        return this._shop;
    }
    set shop(shopItem: ShopItem) {
        this._shop = shopItem;
        if (isNil(shopItem)) {
            return;
        }
        this.categoryService.updateID(shopItem.categoryID);
    }

    get shopUrl(): string {
        if (isShopLocationUrl(this.shop.location)) {
            return this.shop.location.url;
        }
        return '--/--';
    }

    category$: Observable<Category> = this.categoryService.category$;

    private _shop: ShopItem;

    constructor(private categoryService: CategoryService) {}
}
