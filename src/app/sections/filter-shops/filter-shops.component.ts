import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';

import { ShopService } from '../../api';
import { Shop } from '../../api-codegen/capi';
import { filterShopsByEnv } from '../payment-section/operations/operators';

@Component({
    selector: 'dsh-filter-shops',
    templateUrl: 'filter-shops.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterShopsComponent {
    @Input() selected?: Pick<Shop, 'id'>[];
    @Output() selectedChange = new EventEmitter<Shop[]>();

    shops$: Observable<Shop[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private shopService: ShopService) {}

    searchShopPredicate(data: Shop, searchStr: string): boolean {
        const lowerSearchStr = searchStr.trim().toLowerCase();
        return data.details.name.toLowerCase().includes(lowerSearchStr) || data.id.includes(lowerSearchStr);
    }

    compareWithShops(s1: Shop, s2: Shop): boolean {
        return s1.id === s2.id;
    }
}
