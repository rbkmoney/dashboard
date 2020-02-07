import { Component } from '@angular/core';

import { TestShopService } from './test-shop.service';

@Component({
    selector: 'dsh-root',
    templateUrl: './app.component.html',
    providers: [TestShopService]
})
export class AppComponent {
    constructor(testShopService: TestShopService) {
        testShopService.initTestShop();
    }
}
