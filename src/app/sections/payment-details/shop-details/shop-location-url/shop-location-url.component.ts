import { Component, Input } from '@angular/core';

import { ShopLocationUrl } from '../../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-shop-location-url',
    templateUrl: './shop-location-url.component.html'
})
export class ShopLocationUrlComponent {
    @Input() shopLocationUrl: ShopLocationUrl;

    localePath = 'sections.paymentDetails.shopDetails';
}
