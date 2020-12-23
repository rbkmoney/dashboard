import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-shop-name',
    templateUrl: './shop-name.component.html',
})
export class ShopNameComponent {
    @Input() shopName: string;
}
