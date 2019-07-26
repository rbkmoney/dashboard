import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { switchMap, filter, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';

import { ClaimsService } from '../../claims';

@Injectable()
export class ClaimService {
    params$ = this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.getParams()),
        shareReplay(1)
    );

    claim$ = this.params$.pipe(
        filter(({ id }) => !!id),
        map(({ id }) => Number(id)),
        distinctUntilChanged(),
        switchMap(id => this.claimsService.getClaim(id)),
        shareReplay(1)
    );

    constructor(private router: Router, private claimsService: ClaimsService) {}

    getParams(baseParams = {}, { params, firstChild } = this.router.routerState.snapshot.root) {
        return firstChild ? this.getParams({ ...baseParams, ...params }, firstChild) : { ...baseParams, ...params };
    }
}
