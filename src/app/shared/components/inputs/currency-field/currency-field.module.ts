import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { RadioGroupFieldModule } from '@dsh/components/form-controls/radio-group-field';

import { CurrencyFieldComponent } from './currency-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, RadioGroupFieldModule],
    declarations: [CurrencyFieldComponent],
    exports: [CurrencyFieldComponent],
})
export class CurrencyFieldModule {}
