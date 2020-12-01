import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FetchOrganizationsService } from './services/fetch-organizations.service';

@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent {
    organizations$ = this.fetchOrganizationsService.searchResult$.subscribe();

    constructor(private fetchOrganizationsService: FetchOrganizationsService) {
        fetchOrganizationsService.search({});
    }

    createOrganization() {}
}
