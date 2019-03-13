import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ActionbarComponent } from './actionbar.component';

@NgModule({
    declarations: [ActionbarComponent],
    imports: [MatIconModule, FlexLayoutModule],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
