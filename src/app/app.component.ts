import { Component, Inject, OnInit } from '@angular/core';

import { ENV, Env } from '../environments';
import { TestShopService } from './test-shop.service';

@Component({
    selector: 'dsh-root',
    templateUrl: './app.component.html',
    providers: [TestShopService],
})
export class AppComponent implements OnInit {
    constructor(private testShopService: TestShopService, @Inject(ENV) public env: Env) {}

    ngOnInit() {
        this.testShopService.createTestShopWhenNoShops();
    }
}
