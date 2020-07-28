import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { DaterangePipe } from './daterange.pipe';

const EXPORTED_DECLARATIONS = [DaterangePipe];

@NgModule({
    imports: [CommonModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class DaterangeModule {}
