import { NgModule } from '@angular/core';

import { CardModule } from './card';

@NgModule({
    imports: [CardModule],
    exports: [CardModule]
})
export class LayoutModule {}
