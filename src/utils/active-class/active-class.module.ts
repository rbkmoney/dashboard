import { NgModule } from '@angular/core';

import { ActiveClassPipe } from './active-class';

@NgModule({
    declarations: [ActiveClassPipe],
    exports: [ActiveClassPipe]
})
export class ActiveClassModule {}
