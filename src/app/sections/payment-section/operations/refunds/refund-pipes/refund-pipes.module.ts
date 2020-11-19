import { NgModule } from '@angular/core';

import { RefundStatusColorPipe } from './refund-status-color.pipe';
import { RefundStatusNamePipe } from './refund-status-name.pipe';

const EXPORTED_MODULES = [RefundStatusColorPipe, RefundStatusNamePipe];

@NgModule({
    declarations: [EXPORTED_MODULES],
    exports: [EXPORTED_MODULES],
})
export class RefundPipesModule {}
