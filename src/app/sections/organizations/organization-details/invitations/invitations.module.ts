import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { CreateInvitationDialogComponent } from './components/create-invitation-dialog/create-invitation-dialog.component';
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
    ],
    declarations: [InvitationsComponent, CreateInvitationDialogComponent],
    exports: [InvitationsComponent],
})
export class InvitationsModule {}
