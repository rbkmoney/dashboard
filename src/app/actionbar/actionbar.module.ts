import { NgModule } from '@angular/core';

import { UiKitModule } from '../ui-kit';
import { ActionbarComponent } from './actionbar.component';

@NgModule({
    declarations: [ActionbarComponent],
    imports: [UiKitModule],
    exports: [ActionbarComponent]
})
export class ActionbarModule {}
