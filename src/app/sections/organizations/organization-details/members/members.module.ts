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

import { OrganizationsModule as OrganizationsAPIModule } from '@dsh/api';
import { ErrorModule, NotificationModule, UserModule } from '@dsh/app/shared';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule, SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, DetailsItemModule, LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { NavigationLinkModule } from '@dsh/components/navigation-link';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ChangeRolesTableModule } from '../../change-roles-table';
import { OrganizationRolesModule } from '../../organization-roles';
import { EditRolesDialogComponent } from './components/edit-roles-dialog/edit-roles-dialog.component';
import { MemberComponent } from './components/member/member.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';

@NgModule({
    imports: [
        MembersRoutingModule,
        CommonModule,
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
        OrganizationRolesModule, BaseDialogModule, ChangeRolesTableModule
    ],
    declarations: [MembersComponent, MembersListComponent, MemberComponent,EditRolesDialogComponent],
    exports: [MembersComponent, MemberComponent],
})
export class MembersModule {}
