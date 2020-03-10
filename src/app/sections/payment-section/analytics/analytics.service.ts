import { Injectable } from '@angular/core';

import { AnalyticsService as APIAnalyticsService, ShopService } from '../../../api';

@Injectable()
export class AnalyticsService {

    shops$ = this.shopService.getShops();

    constructor(
        private analyticsService: APIAnalyticsService,
        private shopService: ShopService
    ) {}

}
