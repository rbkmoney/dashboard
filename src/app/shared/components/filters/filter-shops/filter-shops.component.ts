import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Shop } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-filter-shops',
    templateUrl: 'filter-shops.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterShopsComponent {
    @Input() shops: Shop[];
    @Input() selected?: Pick<Shop, 'id'>[];
    @Output() selectedChange = new EventEmitter<Shop[]>();

    searchShopPredicate(data: Shop, searchStr: string): boolean {
        const lowerSearchStr = searchStr.trim().toLowerCase();
        return data.details.name.toLowerCase().includes(lowerSearchStr) || data.id.includes(lowerSearchStr);
    }

    compareWithShops(s1: Shop, s2: Shop): boolean {
        return s1.id === s2.id;
    }
}
