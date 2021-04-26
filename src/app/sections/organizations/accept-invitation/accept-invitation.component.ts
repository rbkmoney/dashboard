import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first, pluck, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared';
import { inProgressTo } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-accept-invitation',
    templateUrl: 'accept-invitation.component.html',
    styleUrls: ['accept-invitation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptInvitationComponent {
    hasError = false;
    isCompleted = false;
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private route: ActivatedRoute,
        private organizationsService: OrganizationsService,
        private errorService: ErrorService
    ) {}

    @inProgressTo('isLoading$')
    accept(): Subscription {
        return this.route.params
            .pipe(
                first(),
                pluck('token'),
                switchMap((invitation: string) => this.organizationsService.joinOrg({ invitation })),
                untilDestroyed(this)
            )
            .subscribe({
                error: (err) => {
                    this.errorService.error(err, false);
                    this.hasError = true;
                },
            })
            .add(() => (this.isCompleted = true));
    }
}
