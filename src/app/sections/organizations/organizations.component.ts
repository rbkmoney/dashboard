import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';
import { OrganizationManagementService } from './services/organization-management/organization-management.service';

@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchOrganizationsService, OrganizationManagementService],
})
export class OrganizationsComponent {}
