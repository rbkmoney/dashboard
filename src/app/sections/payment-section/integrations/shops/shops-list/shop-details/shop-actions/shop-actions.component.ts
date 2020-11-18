import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopItem } from '../../../interfaces';

@Component({
    selector: 'dsh-shop-actions',
    templateUrl: './shop-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopActionsComponent {
    @Input() shop: ShopItem;

    @Output() activateShop = new EventEmitter<string>();
    @Output() suspendShop = new EventEmitter<string>();

    suspend(id: string): void {
        this.suspendShop.emit(id);
    }

    activate(id: string): void {
        this.activateShop.emit(id);
    }
}
