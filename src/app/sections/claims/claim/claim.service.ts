import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, filter, map, distinctUntilChanged, share } from 'rxjs/operators';

import { ClaimsService } from '../../../claims';

@Injectable()
export class ClaimService {
    claim$ = this.router.routerState.root.firstChild.params.pipe(
        filter(({ id }) => !!id),
        map(({ id }) => Number(id)),
        distinctUntilChanged(),
        switchMap(id => this.claimsService.getClaim(id)),
        share()
    );

    constructor(private router: Router, private claimsService: ClaimsService) {}
}
