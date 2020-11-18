import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import isNil from 'lodash.isnil';

import { ShopItem } from '../interfaces';
import { ShopsListService } from './shops-list.service';

@Component({
    selector: 'dsh-shops-list',
    templateUrl: 'shops-list.component.html',
    providers: [ShopsListService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsListComponent {
    @Input()
    set shopList(shops: ShopItem[] | null) {
        if (isNil(shops)) {
            return;
        }
        this.shopsPanelsListService.updateShops(shops);
    }

    @Input() lastUpdated: string;
    @Input() isLoading: boolean;

    @Output() refreshData: EventEmitter<void> = new EventEmitter();
    @Output() activateShop = new EventEmitter<string>();
    @Output() suspendShop = new EventEmitter<string>();

    shops$ = this.shopsPanelsListService.shops$;
    selectedPanelPosition$ = this.shopsPanelsListService.selectedPanelPosition$;
    hasMore$ = this.shopsPanelsListService.hasMore$;

    constructor(private shopsPanelsListService: ShopsListService) {}

    suspend(id: string): void {
        this.suspendShop.emit(id);
    }

    activate(id: string): void {
        this.activateShop.emit(id);
    }

    showMore(): void {
        this.shopsPanelsListService.showMore();
    }

    select(idx: number): void {
        this.shopsPanelsListService.select(idx);
    }
}
