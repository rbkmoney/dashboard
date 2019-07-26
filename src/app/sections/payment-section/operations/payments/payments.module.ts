import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
} from '@angular/material';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { TableModule } from '../../../../table';
import { LocaleModule } from '../../../../locale';
import { SearchFormComponent } from './search-form/search-form.component';
import { FormControlsModule } from '../../../../form-controls';
import { DaterangeSelectorModule } from '../daterange-selector';
import { StatusModule } from '../../../../status';
import { PaymentStatusColorPipe } from './status-color.pipe';
import { FromMinorPipe } from './from-minor.pipe';

@NgModule({
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TableModule,
        MatIconModule,
        LocaleModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule,
        FormControlsModule,
        DaterangeSelectorModule,
        StatusModule
    ],
    exports: [FromMinorPipe],
    declarations: [PaymentsComponent, SearchFormComponent, PaymentStatusColorPipe, FromMinorPipe]
})
export class PaymentsModule {}
