import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ShopInfo } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-shop-info-panel',
    templateUrl: 'shop-info-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopInfoPanelComponent {
    @Input() shopInfo: ShopInfo;
}
