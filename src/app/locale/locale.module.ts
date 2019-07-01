import { NgModule } from '@angular/core';

import { LocalePipe } from './locale.pipe';

@NgModule({
    declarations: [LocalePipe],
    exports: [LocalePipe]
})
export class LocaleModule {}
