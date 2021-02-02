import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';

@Component({
    selector: 'dsh-organization-details',
    templateUrl: 'organization-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDetailsComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        shareReplay(1)
    );
    links = [
        {
            path: 'members',
        },
        {
            path: 'invitations',
        },
    ];

    constructor(private organizationsService: OrganizationsService, private route: ActivatedRoute) {}
}
