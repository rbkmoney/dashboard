import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatusComponent } from './status.component';

@NgModule({
    imports: [CommonModule],
    declarations: [StatusComponent],
    entryComponents: [StatusComponent],
    exports: [StatusComponent]
})
export class StatusModule {}
