import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { ShopDetailsService } from './shop-details.service';
import { Shop } from '../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: './shop-details.component.html',
    providers: [ShopDetailsService]
})
export class ShopDetailsComponent implements OnChanges {
    @Input() shopID: string;

    shop$: Observable<Shop>;

    localePath = 'sections.paymentDetails.shopDetails';

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private shopDetailsService: ShopDetailsService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.shopID.currentValue !== changes.shopID.previousValue) {
            this.shop$ = this.shopDetailsService.getShopByID(this.shopID);
        }
    }
}
