import { Component } from '@angular/core';

import { ShopCreationService } from '../../shop-creation/shop-creation.service';

@Component({
    selector: 'dsh-create-shop-button',
    templateUrl: './create-button-shop.component.html',
})
export class CreateButtonShopComponent {
    constructor(private createShopService: ShopCreationService) {}

    createShop(): void {
        this.createShopService.createShop();
    }
}
