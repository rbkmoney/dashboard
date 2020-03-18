import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Shop } from '../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../constants';
import { ShopDetailsService } from './shop-details.service';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: './shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit {
    @Input() shopID: string;

    shop$: Observable<Shop>;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private shopDetailsService: ShopDetailsService) {}

    ngOnInit() {
        this.shop$ = this.shopDetailsService.getShopByID(this.shopID);
    }
}
