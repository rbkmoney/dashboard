import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { ShopItem } from '../../../../models';
import { ShopActionsService } from '../../services/shop-actions/shop-actions.service';
import { isSuccessfulShopAction } from '../../services/shop-actions/utils';

@Component({
    selector: 'dsh-shop-actions',
    templateUrl: './shop-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopActionsService],
})
export class ShopActionsComponent {
    @Input() shop: ShopItem;

    @Output() updateData = new EventEmitter<void>();

    constructor(private shopActions: ShopActionsService) {}

    suspend(id: string): void {
        this.shopActions
            .suspend(id)
            .pipe(take(1), filter(isSuccessfulShopAction))
            .subscribe(() => {
                this.updateData.emit();
            });
    }

    activate(id: string): void {
        this.shopActions
            .activate(id)
            .pipe(take(1), filter(isSuccessfulShopAction))
            .subscribe(() => {
                this.updateData.emit();
            });
    }
}
