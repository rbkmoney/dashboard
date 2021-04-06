import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Shop } from '@dsh/api-codegen/capi';

import { ShopDetailsService } from './shop-details.service';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: 'shop-details.component.html',
})
export class ShopDetailsComponent implements OnInit {
    @Input() shopID: string;

    shop$: Observable<Shop>;

    constructor(private shopDetailsService: ShopDetailsService) {}

    ngOnInit() {
        this.shop$ = this.shopDetailsService.getShopByID(this.shopID);
    }
}
