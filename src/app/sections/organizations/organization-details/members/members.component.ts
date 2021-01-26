import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';

import { mapToTimestamp } from '../../../../custom-operators';
import { OrganizationManagementService } from '../../services/organization-management/organization-management.service';

@Component({
    selector: 'dsh-members',
    templateUrl: 'members.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        shareReplay(1)
    );
    members$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationManagementService.getMembers(orgId)),
        shareReplay(1)
    );
    lastUpdated$ = this.members$.pipe(mapToTimestamp, shareReplay(1));
    isLoading$ = of(false);

    constructor(
        private organizationManagementService: OrganizationManagementService,
        private organizationsService: OrganizationsService,
        private route: ActivatedRoute
    ) {}

    refresh() {}
}
