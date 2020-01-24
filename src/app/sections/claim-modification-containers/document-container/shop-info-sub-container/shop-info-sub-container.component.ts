import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import get from 'lodash.get';

import { ShopLocationUrl } from '../../../../api-codegen/capi';
import { ShopInfo } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-shop-info-sub-container',
    templateUrl: 'shop-info-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopInfoSubContainerComponent implements OnChanges {
    @Input() shopInfo: ShopInfo;

    location: ShopLocationUrl;

    ngOnChanges({ shopInfo }: SimpleChanges) {
        this.location = get(shopInfo, ['currentValue', 'location']);
    }
}
