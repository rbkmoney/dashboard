import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputsComponent } from './inputs.component';
import { FormControlsModule } from '../../form-controls/form-controls.module';
import { LayoutModule } from 'src/app/layout';

@NgModule({
    imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, FormControlsModule, LayoutModule],
    declarations: [InputsComponent]
})
export class InputsModule {}
