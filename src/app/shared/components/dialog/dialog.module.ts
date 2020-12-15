import { NgModule } from '@angular/core';

import { BaseDialogModule } from './base-dialog';

const MODULES = [BaseDialogModule];

@NgModule({
    exports: MODULES,
})
export class DialogModule {}
