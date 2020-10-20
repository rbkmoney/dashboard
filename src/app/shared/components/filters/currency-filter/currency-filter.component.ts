import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Shop } from '../../../../api-codegen/capi';

@Component({
    selector: 'dsh-currency-filter',
    templateUrl: 'currency-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFilterComponent {
    @Input() currencies: string[];
    @Input() selected?: string;
    @Output() selectedChange = new EventEmitter<string>();

    searchShopPredicate(data: Shop, searchStr: string): boolean {
        const lowerSearchStr = searchStr.trim().toLowerCase();
        return data.details.name.toLowerCase().includes(lowerSearchStr) || data.id.includes(lowerSearchStr);
    }

    compareWithShops(s1: Shop, s2: Shop): boolean {
        return s1.id === s2.id;
    }
}
