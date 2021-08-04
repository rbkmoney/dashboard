import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, of } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member } from '@dsh/api-codegen/organizations';
import { ErrorService } from '@dsh/app/shared';
import { mapToTimestamp, progress } from '@dsh/operators';

@UntilDestroy()
@Injectable()
export class FetchMembersService {
    members$ = defer(() => this.loadMembers$).pipe(
        switchMapTo(this.route.params),
        switchMap(({ orgId }) =>
            this.organizationsService.listOrgMembers(orgId).pipe(
                pluck('result'),
                catchError((err) => {
                    this.errorService.error(err);
                    return of([] as Member[]);
                })
            )
        ),
        untilDestroyed(this),
        shareReplay(1)
    );
    lastUpdated$ = this.members$.pipe(mapToTimestamp, untilDestroyed(this), shareReplay(1));
    isLoading$ = defer(() => progress(this.loadMembers$, this.members$)).pipe(untilDestroyed(this), shareReplay(1));

    private loadMembers$ = new BehaviorSubject<void>(undefined);

    constructor(
        private organizationsService: OrganizationsService,
        private errorService: ErrorService,
        private route: ActivatedRoute
    ) {}

    load() {
        this.loadMembers$.next();
    }
}
