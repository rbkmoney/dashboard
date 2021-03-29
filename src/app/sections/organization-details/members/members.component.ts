import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, of } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared';
import { mapToTimestamp, progress } from '@dsh/operators';

@UntilDestroy()
@Component({
    selector: 'dsh-members',
    templateUrl: 'members.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        untilDestroyed(this),
        shareReplay(1)
    );
    members$ = defer(() => this.loadMembers$).pipe(
        switchMapTo(this.route.params),
        switchMap(({ orgId }) =>
            this.organizationsService.listOrgMembers(orgId).pipe(
                pluck('result'),
                catchError((err) => {
                    this.errorService.error(err);
                    return of([]);
                })
            )
        ),
        untilDestroyed(this),
        shareReplay(1)
    );
    lastUpdated$ = this.members$.pipe(mapToTimestamp, shareReplay(1));
    isLoading$ = defer(() => progress(this.loadMembers$, this.members$)).pipe(untilDestroyed(this), shareReplay(1));

    private loadMembers$ = new BehaviorSubject<void>(undefined);

    constructor(
        private organizationsService: OrganizationsService,
        private route: ActivatedRoute,
        private errorService: ErrorService
    ) {}

    refresh() {
        this.loadMembers$.next();
    }
}
