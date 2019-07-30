import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import get from 'lodash.get';

import { ShopDetailsService } from './shop-details.service';
import { Shop, ShopLocation } from '../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: './shop-details.component.html',
    providers: [ShopDetailsService]
})
export class ShopDetailsComponent implements OnInit {
    @Input() shopID: string;

    @Input() layoutGap = '20px';

    private shop$: Observable<Shop>;

    localePath = 'sections.paymentDetails.shopDetails';

    constructor(private shopDetailsService: ShopDetailsService) {}

    ngOnInit() {
        this.shop$ = this.shopDetailsService.getShopByID(this.shopID);
    }

    getShopUrl(location: ShopLocation): string {
        return get(location, 'url');
    }
}
