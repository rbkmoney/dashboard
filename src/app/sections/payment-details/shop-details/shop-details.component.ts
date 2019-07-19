import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: './shop-details.component.html'
})
export class ShopDetailsComponent {
    @Input() shopName: string;

    @Input() shopURL: string;

    @Input() layoutGap = '20px';

    localePath = 'sections.paymentDetails.shopDetails';
}
