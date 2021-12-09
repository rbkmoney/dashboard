import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defer, concat, EMPTY, ReplaySubject } from 'rxjs';
import { switchMap, pluck, tap, mapTo, catchError, shareReplay, distinctUntilChanged } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Organization } from '@dsh/api-codegen/organizations';

@Injectable()
export class ContextService {
    organization$: Observable<Organization> = concat(
        defer(() => this.initOrganization$).pipe(
            switchMap(() => this.organizationsService.getContext()),
            pluck('organizationId'),
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 404)
                    return this.initOrganization().pipe(switchMap(() => EMPTY));
                console.error(err);
                return EMPTY;
            })
        ),
        defer(() => this.switchOrganization$).pipe(
            distinctUntilChanged(),
            switchMap((id) => this.organizationsService.switchContext(id).pipe(mapTo(id)))
        )
    ).pipe(
        switchMap((id) => this.organizationsService.getOrg(id)),
        shareReplay(1)
    );

    private initOrganization$ = new ReplaySubject<void>(1);
    private switchOrganization$ = new ReplaySubject<string>(1);

    constructor(private organizationsService: OrganizationsService) {}

    init(): void {
        this.initOrganization$.next();
    }

    switchOrganization(organizationId: string): void {
        this.switchOrganization$.next(organizationId);
    }

    private initOrganization() {
        return this.organizationsService.listOrgMembership(1).pipe(
            pluck('result', 0, 'id'),
            tap((id) => this.switchOrganization(id))
        );
    }
}
