import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiKitModule } from '../ui-kit';
import { ActionbarComponent } from './actionbar.component';

@NgModule({
    declarations: [ActionbarComponent],
    imports: [CommonModule, UiKitModule],
    exports: [ActionbarComponent],
    providers: []
})
export class ActionbarModule {}
