import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MultiSelectFieldComponent } from './multi-select-field.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, FormsModule],
    declarations: [MultiSelectFieldComponent],
    exports: [MultiSelectFieldComponent],
})
export class MultiSelectFieldModule {}
