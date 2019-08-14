import { NgModule } from '@angular/core';

import { FromMinorPipe } from './from-minor.pipe';
import { ToMinorPipe } from './to-minor.pipe';

@NgModule({
    declarations: [FromMinorPipe, ToMinorPipe],
    exports: [FromMinorPipe, ToMinorPipe]
})
export class ViewUtilsModule {}
