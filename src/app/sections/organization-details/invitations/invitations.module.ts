import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { DialogModule } from '@dsh/app/shared/components/dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { EmptyModule } from '@dsh/components/empty';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule, SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, CardModule, DetailsItemModule, RowModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { NestedTableModule } from '@dsh/components/nested-table';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ChangeRolesTableModule } from '../../organizations/change-roles-table';
import { OrganizationRolesModule } from '../../organizations/organization-roles';
import { CreateInvitationDialogComponent } from './components/create-invitation-dialog/create-invitation-dialog.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { InvitationsListComponent } from './components/invitations-list/invitations-list.component';
import { InvitationsRoutingModule } from './invitations-routing.module';
import { InvitationsComponent } from './invitations.component';

@NgModule({
    imports: [
        CommonModule,
        InvitationsRoutingModule,
        ScrollUpModule,
        EmptySearchResultModule,
        ShowMorePanelModule,
        TranslocoModule,
        FlexModule,
        ButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        RowModule,
        AccordionModule,
        CardModule,
        MatDividerModule,
        SpinnerModule,
        IndicatorsModule,
        DialogModule,
        NestedTableModule,
        MatCheckboxModule,
        MatRadioModule,
        ChangeRolesTableModule,
        OrganizationRolesModule,
        EmptyModule,
        DetailsItemModule,
        GridModule,
    ],
    declarations: [
        InvitationsComponent,
        CreateInvitationDialogComponent,
        InvitationsListComponent,
        InvitationComponent,
    ],
    exports: [InvitationsComponent],
})
export class InvitationsModule {}
