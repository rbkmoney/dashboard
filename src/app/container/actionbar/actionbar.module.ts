import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { ActionbarComponent } from './actionbar.component';
import { DropdownModule } from '../../dropdown';
import { StateNavModule } from '../../state-nav';
import { ButtonModule } from '../../button';
import { StatusModule } from '../../status';
import { UserComponent } from './user';
import { ClaimsComponent, ClaimsListComponent, ClaimsListItemComponent, ClaimTypeLabelPipe } from './claims';
import { ActionItemComponent } from './action-item';
import { ClaimsService } from '../../api/claims';
import { SpinnerModule } from '../../spinner';

@NgModule({
    imports: [
        MatIconModule,
        FlexLayoutModule,
        DropdownModule,
        OverlayModule,
        StateNavModule,
        ButtonModule,
        StatusModule,
        MatMenuModule,
        RouterModule,
        CommonModule,
        SpinnerModule,
        TranslocoModule
    ],
    declarations: [
        ActionbarComponent,
        ActionItemComponent,
        ClaimsListComponent,
        ClaimsListItemComponent,
        UserComponent,
        ClaimsComponent,
        ClaimTypeLabelPipe
    ],
    providers: [ClaimsService],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
