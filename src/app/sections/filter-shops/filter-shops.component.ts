import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { MultiselectFilterItem } from '@dsh/components/filter';

import { ComponentChanges } from '../../../type-utils';
import { ShopService } from '../../api';
import { Shop } from '../../api-codegen/capi';
import { filterShopsByEnv } from '../payment-section/operations/operators';

@Component({
    selector: 'dsh-filter-shops',
    templateUrl: 'filter-shops.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterShopsComponent implements OnChanges {
    @Input() selected?: (Shop | Shop['id'])[];
    @Output() selectedChange = new EventEmitter<Shop[]>();

    shopItems$: Observable<MultiselectFilterItem<Shop>[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        map((shops) => shops.map((shop) => ({ label: shop.details.name, id: shop.id, data: shop }))),
        shareReplay(1)
    );
    selectedItemsIds$ = new BehaviorSubject<MultiselectFilterItem<Shop>['id'][]>([]);

    constructor(private route: ActivatedRoute, private shopService: ShopService) {}

    ngOnChanges({ selected }: ComponentChanges<FilterShopsComponent>) {
        if (selected && selected.currentValue !== selected.previousValue) {
            this.selectedItemsIds$.next(selected.currentValue.map((i) => (typeof i === 'object' ? i.id : i)));
        }
    }

    selectedShopsChange(shopItems: MultiselectFilterItem<Shop>[]) {
        const shops = shopItems.map(({ data }) => data);
        this.selectedChange.emit(shops);
    }
}
