import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { mapToTimestamp } from '../../../custom-operators';
import { FetchOrganizationMemberService } from '../services/fetch-organization-member/fetch-organization-member.service';

@Component({
    selector: 'dsh-organization-details',
    templateUrl: 'organization-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDetailsComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.fetchOrganizationMemberService.getOrganization(orgId)),
        shareReplay(1)
    );
    members$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.fetchOrganizationMemberService.getMembers(orgId)),
        shareReplay(1)
    );
    lastUpdated$ = this.members$.pipe(mapToTimestamp, shareReplay(1));
    hasMore$ = of(true);
    isLoading$ = of(false);

    constructor(
        private fetchOrganizationMemberService: FetchOrganizationMemberService,
        private route: ActivatedRoute
    ) {}

    refresh() {}

    showMore() {}
}
