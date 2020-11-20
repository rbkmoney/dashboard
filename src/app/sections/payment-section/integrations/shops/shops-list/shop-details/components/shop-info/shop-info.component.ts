import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';

import { Category } from '../../../../../../../../api-codegen/capi/swagger-codegen';
import { ShopItem } from '../../../../types';
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

    category$: Observable<Category> = this.categoryService.category$;

    private _shop: ShopItem;

    constructor(private categoryService: CategoryService) {}
}
