import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopItem } from '../../interfaces';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: './shop-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopDetailsComponent {
    @Input() shop: ShopItem;

    @Output() activateShop = new EventEmitter<string>();
    @Output() suspendShop = new EventEmitter<string>();

    activate(id: string) {
        this.activateShop.emit(id);
    }

    suspend(id: string) {
        this.suspendShop.emit(id);
    }
}
