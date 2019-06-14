import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { ActionbarComponent } from './actionbar.component';
import { DropdownModule } from '../../dropdown/dropdown.module';
import { StateNavModule } from '../../state-nav';

@NgModule({
    imports: [MatIconModule, FlexLayoutModule, DropdownModule, OverlayModule, StateNavModule],
    declarations: [ActionbarComponent],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
