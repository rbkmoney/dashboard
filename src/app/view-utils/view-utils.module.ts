import { NgModule } from '@angular/core';

import { FromMinorPipe } from './from-minor.pipe';

@NgModule({
    declarations: [FromMinorPipe],
    exports: [FromMinorPipe]
})
export class ViewUtilsModule {}
