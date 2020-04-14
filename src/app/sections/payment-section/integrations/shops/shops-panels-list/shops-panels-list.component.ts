import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ShopsService } from '../shops.service';
import { ShopsPanelsListService } from './shops-panels-list.service';

@Component({
    selector: 'dsh-shops-panels-list',
    templateUrl: 'shops-panels-list.component.html',
    providers: [ShopsPanelsListService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsPanelsListComponent {
    shops$ = this.shopsService.shops$;

    constructor(private shopsPanelsListService: ShopsPanelsListService, private shopsService: ShopsService) {}
}
