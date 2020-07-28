import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { DaterangePipe } from './daterange.pipe';
import { DaterangeService } from './daterange.service';

const EXPORTED_DECLARATIONS = [DaterangePipe];

@NgModule({
    imports: [CommonModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [DaterangeService],
})
export class DaterangeModule {}
