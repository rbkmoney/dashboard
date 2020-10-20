import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';

import { CurrencyFilterComponent } from './currency-filter.component';
import { RadioGroupFilterModule } from '@dsh/components/filters/radio-group-filter';

const EXPORTED_DECLARATIONS = [CurrencyFilterComponent];

@NgModule({
    imports: [MultiselectFilterModule, CommonModule, TranslocoModule, RadioGroupFilterModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class CurrencyFilterModule {}
