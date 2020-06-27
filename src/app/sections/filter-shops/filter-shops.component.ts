import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { Item } from '@dsh/components/buttons';

import { ShopService } from '../../api';
import { Shop } from '../../api-codegen/capi';
import { filterShopsByEnv } from '../payment-section/operations/operators';

type ShopItem = Item & { shop: Shop };

@Component({
    selector: 'dsh-filter-shops',
    templateUrl: 'filter-shops.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterShopsComponent {
    @Output() selectedChange = new EventEmitter<Shop[]>();

    shops$: Observable<ShopItem[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        map((shops) => shops.map((shop) => ({ label: shop.details.name, value: shop.details.name, shop }))),
        shareReplay(1)
    );
    displayedShops$ = new BehaviorSubject<string[]>([]);
    displayedShopsStr$ = this.displayedShops$.pipe(
        map((labels) => labels.join(', ')),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private shopService: ShopService) {}

    selectedShopsChange(shopsItems: ShopItem[]) {
        const shops = shopsItems.map(({ shop }) => shop);
        this.selectedChange.emit(shops);
        this.displayedShops$.next(shopsItems.map(({ label }) => label));
    }
}
