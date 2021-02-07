import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Link } from '@dsh/app/shared';

const LINKS: Link[] = [
    {
        path: 'members',
    },
    {
        path: 'invitations',
    },
];

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
    readonly links = LINKS;

    constructor(private organizationsService: OrganizationsService, private route: ActivatedRoute) {}
}
