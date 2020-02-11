import { Component, OnInit } from '@angular/core';

import { TestShopService } from './test-shop.service';

@Component({
    selector: 'dsh-root',
    templateUrl: './app.component.html',
    providers: [TestShopService]
})
export class AppComponent implements OnInit {
    constructor(private testShopService: TestShopService) {}

    ngOnInit() {
        this.testShopService.createTestShopWhenNoShops();
    }
}
