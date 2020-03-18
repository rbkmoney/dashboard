import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { StatusModule } from '@dsh/components/indicators';
import { DropdownModule } from '@dsh/components/layout';

import { ClaimsService } from '../../api/claims';
import { SpinnerModule } from '../../spinner';
import { StateNavModule } from '../../state-nav';
import { ActionItemComponent } from './action-item';
import { ActionbarComponent } from './actionbar.component';
import { ClaimsComponent, ClaimsListComponent, ClaimsListItemComponent } from './claims';
import { UserComponent } from './user';

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
        ClaimsComponent
    ],
    providers: [ClaimsService],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
