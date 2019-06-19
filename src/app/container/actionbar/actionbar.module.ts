import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';

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
        StatusModule
    ],
    declarations: [ActionbarComponent, ClaimsListComponent, ClaimsListItemComponent, UserComponent, ClaimsComponent],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
