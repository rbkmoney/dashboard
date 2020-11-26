import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { Claim } from '../../../../../api-codegen/claim-management/swagger-codegen';
import { ClaimsService } from '../../../claims.service';

@Injectable()
export class ClaimsExpandedIdManagerService extends ExpandedIdManager<Claim> {
    constructor(protected route: ActivatedRoute, protected router: Router, private claimsService: ClaimsService) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Claim[]> {
        return this.claimsService.searchResult$;
    }
}
