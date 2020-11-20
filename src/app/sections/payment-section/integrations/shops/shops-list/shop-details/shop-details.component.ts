import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopItem } from '../../types/shop-item';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: 'shop-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopDetailsComponent {
    @Input() shop: ShopItem;

    @Output() updateData = new EventEmitter<void>();

    requestUpdateData(): void {
        this.updateData.emit();
    }
}
