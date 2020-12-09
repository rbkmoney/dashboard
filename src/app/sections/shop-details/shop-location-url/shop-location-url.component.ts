import { Component, Input } from '@angular/core';

import { ShopLocationUrl } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-shop-location-url',
    templateUrl: 'shop-location-url.component.html',
})
export class ShopLocationUrlComponent {
    @Input() shopLocationUrl: ShopLocationUrl;
}
