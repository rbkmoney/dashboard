import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ActionbarComponent } from './actionbar.component';
import { DropdownModule } from '../../dropdown';
import { StateNavModule } from '../../state-nav';
import { ButtonModule } from '../../button';
import { StatusModule } from '../../status';
import { UserComponent } from './user';
import { ClaimsComponent, ClaimsListComponent, ClaimsListItemComponent } from './claims';

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
        RouterModule
    ],
    declarations: [ActionbarComponent, ClaimsListComponent, ClaimsListItemComponent, UserComponent, ClaimsComponent],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
