import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { Shop } from '../../../../../../../api-codegen/capi/swagger-codegen';
import { FetchShopsService } from '../../../services/fetch-shops/fetch-shops.service';

@Injectable()
export class ShopsExpandedIdManagerService extends ExpandedIdManager<Shop> {
    constructor(protected route: ActivatedRoute, protected router: Router, private shopsService: FetchShopsService) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Shop[]> {
        return this.shopsService.allShops$;
    }
}
