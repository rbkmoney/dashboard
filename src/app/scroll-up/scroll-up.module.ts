import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { ScrollUpComponent } from './scroll-up.component';
import { ButtonModule } from '../button';

@NgModule({
    imports: [MatIconModule, ButtonModule],
    declarations: [ScrollUpComponent],
    exports: [ScrollUpComponent]
})
export class ScrollUpModule {}
