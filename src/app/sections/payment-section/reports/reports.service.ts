import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { ReportsService as ReportsApiService, ShopService } from '../../../api';
import { Report } from '../../../api-codegen/anapi';
import { PartialFetcher } from '../../partial-fetcher';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';
import { SearchParams } from './search-params';

@Injectable()
export class ReportsService extends PartialFetcher<Report, SearchParams> {
    shopsInfo$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo
    );

    constructor(
        private reportsService: ReportsApiService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        super();
    }

    protected fetch(params: SearchParams, continuationToken: string) {
        return this.reportsService.searchReports({ ...params, continuationToken });
    }
}
