import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';
import { OrganizationManagementService } from './services/organization-management/organization-management.service';

@NgModule({
    imports: [CommonModule, OrganizationsRoutingModule, FlexModule, TranslocoModule],
    declarations: [OrganizationsComponent],
    providers: [FetchOrganizationsService, OrganizationManagementService],
})
export class OrganizationsModule {}
