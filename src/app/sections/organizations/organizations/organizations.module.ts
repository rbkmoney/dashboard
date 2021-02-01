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

import { OrganizationsModule as OrganizationsAPIModule } from '@dsh/api/organizations';
import { ErrorModule, NotificationModule, UserModule } from '@dsh/app/shared';
import { DialogModule } from '@dsh/app/shared/components/dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule, SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, DetailsItemModule, LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { NavigationLinkModule } from '@dsh/components/navigation-link';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { OrganizationRolesModule } from '../organization-roles';
import { CreateOrganizationDialogComponent } from './components/create-organization-dialog/create-organization-dialog.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { RenameOrganizationDialogComponent } from './components/rename-organization-dialog/rename-organization-dialog.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';

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
        DialogModule,
    ],
    declarations: [
        OrganizationsComponent,
        OrganizationsListComponent,
        OrganizationComponent,
        CreateOrganizationDialogComponent,
        RenameOrganizationDialogComponent,
    ],
})
export class OrganizationsModule {}
