import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { LinkLabelComponent } from './link-label.component';

@NgModule({
    imports: [MatIconModule, FlexLayoutModule],
    declarations: [LinkLabelComponent],
    exports: [LinkLabelComponent],
})
export class LinkLabelModule {}
