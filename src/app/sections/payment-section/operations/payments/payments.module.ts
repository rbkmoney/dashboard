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
import { ButtonToggleModule } from '../../../../button-toggle';
import { LocaleModule } from '../../../../locale';
import { SearchFormComponent } from './search-form/search-from.component';

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
        ButtonToggleModule,
        MatIconModule,
        LocaleModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule
    ],
    declarations: [PaymentsComponent, SearchFormComponent]
})
export class PaymentsModule {}
