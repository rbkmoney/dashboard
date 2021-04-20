import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Subscription } from 'rxjs';

import { OrganizationsService } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared';
import { inProgressTo } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-accept-invitation',
    templateUrl: 'accept-invitation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptInvitationComponent {
    isLoading$ = new BehaviorSubject(false);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private organizationsService: OrganizationsService,
        private errorService: ErrorService
    ) {}

    @inProgressTo('isLoading$')
    accept(): Subscription {
        const invitation = this.route.snapshot.params.token as string;
        return this.organizationsService
            .joinOrg({ invitation })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => void this.router.navigate(['organizations']),
                (err) => this.errorService.error(err)
            );
    }
}
