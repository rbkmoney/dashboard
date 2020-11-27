import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { Claim } from '../../../../api-codegen/claim-management/swagger-codegen';
import { FetchClaimsService } from '../../fetch-claims.service';

@Injectable()
export class ClaimsExpandedIdManagerService extends ExpandedIdManager<Claim> {
    constructor(protected route: ActivatedRoute, protected router: Router, private claimsService: FetchClaimsService) {
        super(route, router);
        combineLatest([this.route.fragment.pipe(take(1)), this.expandedId$])
            .pipe(
                take(5),
                filter(([itemID, expandedID]) => itemID && expandedID === -1)
            )
            .subscribe(() => this.claimsService.fetchMore());
    }

    protected get dataSet$(): Observable<Claim[]> {
        return this.claimsService.searchResult$;
    }
}
