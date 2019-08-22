import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ActionbarComponent } from './actionbar.component';
import { DropdownModule } from '../../dropdown';
import { StateNavModule } from '../../state-nav';
import { ButtonModule } from '../../button';
import { StatusModule } from '../../status';
import { UserComponent } from './user';
import { ClaimsComponent, ClaimsListComponent, ClaimsListItemComponent } from './claims';
import { ActionItemComponent } from './action-item';
import { APIModule } from '../../api';
import { ClaimsService } from '../../claims';
import { LocaleModule } from '../../locale';
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
        APIModule,
        CommonModule,
        LocaleModule,
        SpinnerModule
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
