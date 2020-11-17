import { Component, Input } from '@angular/core';

import { ShopItem } from '../interfaces';

@Component({
    selector: 'dsh-shop-balance',
    templateUrl: './shop-balance.component.html',
    styleUrls: ['./shop-balance.component.scss'],
})
export class ShopBalanceComponent {
    @Input() shop: ShopItem;
}
