import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopItem } from './interfaces';
import { ShopsListService } from './services/shops-list/shops-list.service';

@Component({
    selector: 'dsh-shops-list',
    templateUrl: 'shops-list.component.html',
    styleUrls: ['shops-list.component.scss'],
    providers: [ShopsListService],
})
export class ShopsListComponent {
    @Input()
    set shopList(shops: ShopItem[]) {
        this.shopsPanelsListService.updateShops(shops);
    }

    @Input() lastUpdated: string;

    @Output() refreshData: EventEmitter<void> = new EventEmitter();
    @Output() activateShop = new EventEmitter<string>();
    @Output() suspendShop = new EventEmitter<string>();

    shops$ = this.shopsPanelsListService.shops$;
    selectedPanelPosition$ = this.shopsPanelsListService.selectedPanelPosition$;
    hasMore$ = this.shopsPanelsListService.hasMore$;

    constructor(private shopsPanelsListService: ShopsListService) {}

    suspend(id: string) {
        this.suspendShop.emit(id);
    }

    activate(id: string) {
        this.activateShop.emit(id);
    }

    showMore() {
        this.shopsPanelsListService.showMore();
    }

    select(idx: number) {
        this.shopsPanelsListService.select(idx);
    }
}
