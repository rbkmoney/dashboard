import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShopItem } from '../interfaces';

@Component({
    selector: 'dsh-shop-row',
    templateUrl: 'shop-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopRowComponent {
    @Input() shop: ShopItem;
}
