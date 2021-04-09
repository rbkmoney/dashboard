import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MaxLengthInputComponent } from './max-length-input.component';

@NgModule({
    imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    declarations: [MaxLengthInputComponent],
    exports: [MaxLengthInputComponent],
})
export class MaxLengthInputModule {}
