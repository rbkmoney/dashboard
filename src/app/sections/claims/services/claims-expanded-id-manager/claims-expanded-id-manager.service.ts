import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Claim } from '@dsh/api-codegen/claim-management/swagger-codegen';
import { ExpandedIdManager } from '@dsh/app/shared/services';

import { FetchClaimsService } from '../fetch-claims/fetch-claims.service';

@Injectable()
export class ClaimsExpandedIdManagerService extends ExpandedIdManager<Claim> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchClaimsService: FetchClaimsService
    ) {
        super(route, router);
    }

    protected fragmentNotFound(): void {
        this.fetchClaimsService.fetchMore();
    }

    protected get dataSet$(): Observable<Claim[]> {
        return this.fetchClaimsService.searchResult$;
    }
}
