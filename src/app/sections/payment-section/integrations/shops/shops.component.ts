import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../../../constants';
import { ShopsService } from './shops.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopsService]
})
export class ShopsComponent {
    shops$ = this.shopsService.shops$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private shopsService: ShopsService) {}
}
