import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import get from 'lodash.get';

import { ShopDetailsService } from './shop-details.service';
import { Shop, ShopLocation } from '../../../api/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: './shop-details.component.html',
    providers: [ShopDetailsService]
})
export class ShopDetailsComponent implements OnInit {
    @Input() shopID: string;

    shop$: Observable<Shop>;

    localePath = 'sections.paymentDetails.shopDetails';

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private shopDetailsService: ShopDetailsService
    ) {}

    ngOnInit() {
        this.shop$ = this.shopDetailsService.getShopByID(this.shopID);
    }
}
