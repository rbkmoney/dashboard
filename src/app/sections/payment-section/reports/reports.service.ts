import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ReportsService as ReportsApiService, ShopService } from '../../../api';
import { SearchParams } from './search-params';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';
import { PartialFetcher } from '../../partial-fetcher';
import { Report } from '../../../api-codegen/anapi';

@Injectable()
export class ReportsService extends PartialFetcher<Report, SearchParams> {
    shopsInfo$ = this.route.params.pipe(pluck('envID'), filterShopsByEnv(this.shopService.shops$), mapToShopInfo);

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
