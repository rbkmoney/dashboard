import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { ActionbarComponent } from './actionbar.component';
import { DropdownModule } from '../../dropdown';
import { StateNavModule } from '../../state-nav';
import { ButtonModule } from '../../button';
import { StatusModule } from '../../status';
import { ClaimListComponent, ClaimListItemComponent } from './claim-list';

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
    declarations: [ActionbarComponent, ClaimListComponent, ClaimListItemComponent],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
