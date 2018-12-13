import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ActionbarComponent } from './actionbar.component';

@NgModule({
    declarations: [ActionbarComponent],
    imports: [MatIconModule],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
