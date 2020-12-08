import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { mapToTimestamp } from '../../custom-operators';
import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';

@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
    organizations$ = this.fetchOrganizationsService.searchResult$;
    hasMore$ = this.fetchOrganizationsService.hasMore$;
    isLoading$ = this.fetchOrganizationsService.doSearchAction$;
    lastUpdated$ = this.organizations$.pipe(mapToTimestamp);

    constructor(private fetchOrganizationsService: FetchOrganizationsService) {}

    ngOnInit() {
        this.fetchOrganizationsService.search();
    }

    createOrganization() {}

    refresh() {
        this.fetchOrganizationsService.refresh();
    }

    showMore() {
        this.fetchOrganizationsService.fetchMore();
    }
}
