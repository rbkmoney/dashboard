import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MultiInputFieldComponent } from './multi-input-field.component';

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule],
    declarations: [MultiInputFieldComponent],
    exports: [MultiInputFieldComponent],
})
export class MultiInputFieldModule {}
