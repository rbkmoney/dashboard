import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { OrganizationsService } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared';

@UntilDestroy()
@Component({
    selector: 'dsh-accept-invitation',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptInvitationComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private organizationsService: OrganizationsService,
        private errorService: ErrorService
    ) {}

    ngOnInit() {
        this.acceptInvitation();
    }

    private acceptInvitation() {
        const invitation = this.route.snapshot.params.token;
        this.organizationsService
            .joinOrg({ invitation })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => this.router.navigate(['organizations']),
                (err) => this.errorService.error(err)
            );
    }
}
