import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '../../../../button';
import { FormControlsModule, RangeDatepickerModule } from '../../../../form-controls';
import { FromMinorModule } from '../../../../from-minor';
import { LanguageModule } from '../../../../language';
import { LayoutModule } from '../../../../layout';
import { SpinnerModule } from '../../../../spinner';
import { StateNavModule } from '../../../../state-nav';
import { StatusModule } from '../../../../status';
import { TableModule } from '../../../../table';
import { EmptySearchResultModule } from '../../empty-search-result';
import { LastUpdatedModule } from '../last-updated/last-updated.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { SearchFormComponent } from './search-form';
import { PaymentStatusColorPipe } from './status-color.pipe';
import { TableComponent } from './table';

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
        ReactiveFormsModule,
        MatSelectModule,
        FormControlsModule,
        StatusModule,
        FromMinorModule,
        LastUpdatedModule,
        SpinnerModule,
        MatSnackBarModule,
        StateNavModule,
        TranslocoModule,
        LanguageModule,
        MatMenuModule,
        RangeDatepickerModule,
        EmptySearchResultModule
    ],
    declarations: [PaymentsComponent, SearchFormComponent, PaymentStatusColorPipe, TableComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class PaymentsModule {}
