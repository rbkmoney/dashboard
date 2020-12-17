import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { IndicatorsModule } from '@dsh/components/indicators';
import { AccordionModule, DetailsItemModule, LayoutModule } from '@dsh/components/layout';
import { NavigationLinkModule } from '@dsh/components/navigation-link';

import { ButtonModule } from '../../../components/buttons';
import { EmptySearchResultModule } from '../../../components/empty-search-result';
import { SpinnerModule } from '../../../components/indicators';
import { ScrollUpModule } from '../../../components/navigation';
import { ShowMorePanelModule } from '../../../components/show-more-panel';
import { OrganizationsModule as OrganizationsAPIModule } from '../../api/organizations';
import { UserModule } from '../../shared';
import { ErrorModule } from '../../shared/services/error';
import { NotificationModule } from '../../shared/services/notification';
import { CreateOrganizationDialogComponent } from './components/create-organization-dialog/create-organization-dialog.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { RenameOrganizationDialogComponent } from './components/rename-organization-dialog/rename-organization-dialog.component';
import { OrganizationRolesModule } from './organization-roles';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';
import { OrganizationManagementService } from './services/organization-management/organization-management.service';

@NgModule({
    imports: [
        CommonModule,
        OrganizationsRoutingModule,
        TranslocoModule,
        FlexLayoutModule,
        LayoutModule,
        ScrollUpModule,
        ShowMorePanelModule,
        EmptySearchResultModule,
        SpinnerModule,
        ButtonModule,
        AccordionModule,
        OrganizationsAPIModule,
        MatDividerModule,
        DetailsItemModule,
        NavigationLinkModule,
        IndicatorsModule,
        UserModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        NotificationModule,
        ErrorModule,
        MatInputModule,
        OrganizationRolesModule,
    ],
    declarations: [
        OrganizationsComponent,
        OrganizationsListComponent,
        OrganizationComponent,
        CreateOrganizationDialogComponent,
        RenameOrganizationDialogComponent,
    ],
    exports: [OrganizationsComponent],
    providers: [FetchOrganizationsService, OrganizationManagementService],
})
export class OrganizationsModule {}
