import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShopItem } from '../../interfaces';

@Component({
    selector: 'dsh-shop-balance',
    templateUrl: './shop-balance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopBalanceComponent {
    @Input() shop: ShopItem;
}
