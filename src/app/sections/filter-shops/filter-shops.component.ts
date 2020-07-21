import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';

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
    @Input() selected?: (Pick<Shop, 'id'> | Shop['id'])[];
    @Output() selectedChange = new EventEmitter<Shop[]>();

    shops$: Observable<Shop[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(1)
    );
    selectedShopsIds$ = new BehaviorSubject<{ [N in string]: boolean }>({});

    constructor(private route: ActivatedRoute, private shopService: ShopService) {}

    ngOnChanges({ selected }: ComponentChanges<FilterShopsComponent>) {
        if (selected) {
            const selectedIds = selected.currentValue.map((i) => (typeof i === 'object' ? i.id : i));
            this.selectedShopsIds$.next(Object.fromEntries(selectedIds.map((id) => [id, true])));
        }
    }

    selectedShopsChange(shops: Shop[]) {
        this.selectedChange.emit(shops);
    }
}
