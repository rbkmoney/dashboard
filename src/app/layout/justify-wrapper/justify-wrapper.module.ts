import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { JustifyWrapperComponent } from './justify-wrapper.component';

@NgModule({
    imports: [FlexLayoutModule],
    declarations: [JustifyWrapperComponent],
    exports: [JustifyWrapperComponent]
})
export class JustifyWrapperModule {}
