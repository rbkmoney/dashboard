import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import get from 'lodash.get';

import { ShopInfo } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-shop-info',
    templateUrl: 'shop-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopInfoComponent implements OnChanges {
    @Input() shopInfo: ShopInfo;

    url: string;

    ngOnChanges({ shopInfo }: SimpleChanges): void {
        this.url = get(shopInfo, ['currentValue', 'location', 'url']);
    }
}
