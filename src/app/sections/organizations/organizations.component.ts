import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MemberRole, OrganizationMembership } from '../../api-codegen/organizations';
import { FetchOrganizationsService } from './services/fetch-organizations.service';

@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent {
    organizations$: Observable<OrganizationMembership[]> = of(
        new Array(10).fill({
            org: {
                id: '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                createdAt: '28 августа 2020, 19:14',
                name: 'Organization name #3',
                owner: 'Owner',
            },
            member: {
                id: '8d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                userEmail: 'test@mail.com',
                roles: new Array(5).fill({
                    roleId: 'Integrator',
                    scope: {
                        id: 'Shop',
                        resourceId: '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                    },
                } as MemberRole),
            },
        })
    ); // this.fetchOrganizationsService.searchResult$;

    constructor(private fetchOrganizationsService: FetchOrganizationsService) {
        // fetchOrganizationsService.search({});
    }

    createOrganization() {}
}
