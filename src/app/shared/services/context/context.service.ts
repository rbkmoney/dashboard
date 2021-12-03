import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable, EMPTY, ReplaySubject, merge } from 'rxjs';
import { switchMap, pluck, tap, catchError, startWith, distinctUntilChanged, shareReplay, first } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Organization } from '@dsh/api-codegen/organizations';

const ORGANIZATION_REG_EXP = /^(\/organization\/)([\w-]+)(.*)/;

@Injectable()
export class ContextService {
    organization$: Observable<Organization> = this.route.params.pipe(
        startWith(this.route.snapshot.params),
        pluck('organizationId'),
        distinctUntilChanged(),
        switchMap((id) =>
            this.organizationsService.getOrg(id).pipe(
                catchError((err) => {
                    console.error(err);
                    return this.getContextOrganization();
                })
            )
        ),
        shareReplay(1)
    );

    private switchOrganization$ = new ReplaySubject<string>(1);

    constructor(
        private organizationsService: OrganizationsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        merge(this.switchOrganization$, this.organization$.pipe(pluck('id'))).subscribe(
            (id) =>
                void this.router.navigateByUrl(
                    this.router.url.replace(ORGANIZATION_REG_EXP, (match, start, oldId, end) =>
                        [start, id, end].join('')
                    )
                )
        );
    }

    switchOrganization(organizationId: string): void {
        this.switchOrganization$.next(organizationId);
    }

    navigate(commands: (string | number)[], extras?: NavigationExtras): Observable<boolean> {
        return this.organization$.pipe(
            first(),
            switchMap(({ id }) => this.router.navigate(['organization', id, ...commands], extras))
        );
    }

    private getInitOrganization() {
        return this.organizationsService.listOrgMembership(1).pipe(pluck('result', 0));
    }

    private getContextOrganization() {
        return this.organizationsService.getContext().pipe(
            pluck('organizationId'),
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 404)
                    return this.getInitOrganization().pipe(
                        pluck('id'),
                        tap((id) => this.switchOrganization(id))
                    );
                console.error(err);
                return EMPTY;
            }),
            switchMap((id) => this.organizationsService.getOrg(id))
        );
    }
}
