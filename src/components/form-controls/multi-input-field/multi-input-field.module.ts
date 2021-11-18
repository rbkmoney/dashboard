import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxBootstrapIconsModule, x, plusLg } from 'ngx-bootstrap-icons';

import { MultiInputFieldComponent } from './multi-input-field.component';

const ICONS = {
    x,
    plusLg,
};

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        NgxBootstrapIconsModule.pick(ICONS, {
            width: '24px',
            height: '24px',
        }),
    ],
    declarations: [MultiInputFieldComponent],
    exports: [MultiInputFieldComponent],
})
export class MultiInputFieldModule {}
