import { NgModule } from '@angular/core';

import { ToMajorPipe } from './to-major.pipe';

@NgModule({
    declarations: [ToMajorPipe],
    exports: [ToMajorPipe],
})
export class ToMajorModule {}
