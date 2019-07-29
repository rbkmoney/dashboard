import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { filter, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ClaimsService } from '../../claims';

@Injectable()
export class ClaimService {
    constructor(private claimsService: ClaimsService) {}

    getClaimByParams(params$: Observable<Params>) {
        return params$.pipe(
            filter(({ id }) => !!id),
            map(({ id }) => Number(id)),
            distinctUntilChanged(),
            switchMap(id => this.claimsService.getClaim(id))
        );
    }
}
