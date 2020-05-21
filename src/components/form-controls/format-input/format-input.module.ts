import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { FormatInputComponent } from './format-input.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, A11yModule, TextMaskModule, CommonModule],
    declarations: [FormatInputComponent],
    exports: [FormatInputComponent],
})
export class FormatInputModule {}
