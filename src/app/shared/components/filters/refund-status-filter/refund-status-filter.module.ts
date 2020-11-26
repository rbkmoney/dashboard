import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiValueFilterModule } from '@dsh/components/filters/multi-value-filter/multi-value-filter.module';
import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';
import { RadioGroupFilterModule } from '@dsh/components/filters/radio-group-filter';

import { RefundStatusFilterComponent } from './refund-status-filter.component';

const EXPORTED_DECLARATIONS = [RefundStatusFilterComponent];

@NgModule({
    imports: [
        MultiselectFilterModule,
        CommonModule,
        TranslocoModule,
        MultiValueFilterModule,
        RadioGroupFilterModule,
        MatRadioModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class RefundStatusFilterModule {}
