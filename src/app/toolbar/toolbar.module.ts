import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [FlexLayoutModule],
    exports: [ToolbarComponent]
})
export class ToolbarModule {}
