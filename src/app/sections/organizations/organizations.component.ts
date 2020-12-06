import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { OrganizationMembership } from '../../api-codegen/organizations';
import { mapToTimestamp } from '../../custom-operators';
import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';
import { mockMemeber } from './tests/mock-member';
import { mockOrg } from './tests/mock-org';

@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
    // organizations$ = this.fetchOrganizationsService.searchResult$;
    // hasMore$ = this.fetchOrganizationsService.hasMore$;
    // isLoading$ = this.fetchOrganizationsService.doSearchAction$;
    // lastUpdated$ = this.organizations$.pipe(mapToTimestamp);

    organizations$: Observable<OrganizationMembership[]> = of(
        new Array(10).fill({
            org: mockOrg,
            member: mockMemeber,
        })
    );
    hasMore$ = of(true);
    isLoading$ = merge(of(false).pipe(delay(2000)), of(true));
    lastUpdated$ = this.organizations$.pipe(mapToTimestamp);

    constructor(private fetchOrganizationsService: FetchOrganizationsService) {}

    ngOnInit() {
        // this.fetchOrganizationsService.search({});
    }

    createOrganization() {}

    refresh() {
        this.fetchOrganizationsService.refresh();
    }

    showMore() {
        this.fetchOrganizationsService.fetchMore();
    }
}
