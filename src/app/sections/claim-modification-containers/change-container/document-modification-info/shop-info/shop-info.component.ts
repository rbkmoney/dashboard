import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import get from 'lodash.get';

import { ShopInfo, ShopLocationUrl } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-shop-info',
    templateUrl: 'shop-info.component.html'
})
export class ShopInfoComponent implements OnChanges {
    @Input() shopInfo: ShopInfo;

    location: ShopLocationUrl;

    ngOnChanges({ shopInfo }: SimpleChanges) {
        if (shopInfo.currentValue) {
            this.location = get(shopInfo.currentValue, ['location']);
        }
    }
}
