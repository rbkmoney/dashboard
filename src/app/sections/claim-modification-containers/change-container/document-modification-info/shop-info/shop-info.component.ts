import { Component, Input } from '@angular/core';

import { ShopInfo } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-shop-info',
    templateUrl: 'shop-info.component.html'
})
export class ShopInfoComponent {
    @Input() shopInfo: ShopInfo;
}
