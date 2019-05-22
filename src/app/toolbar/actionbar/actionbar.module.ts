import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { ActionbarComponent } from './actionbar.component';
import { DropdownModule } from '../../dropdown/dropdown.module';

@NgModule({
    declarations: [ActionbarComponent],
    imports: [MatIconModule, FlexLayoutModule, DropdownModule, OverlayModule],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
