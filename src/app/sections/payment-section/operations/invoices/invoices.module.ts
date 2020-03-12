import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule
} from '@angular/material';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { TableModule } from '../../../../table';
import { SearchFormComponent } from './search-form';
import { FormControlsModule, RangeDatepickerModule } from '../../../../form-controls';
import { InvoicesComponent } from './invoices.component';
import { StatusModule } from '../../../../status';
import { InvoiceStatusColorPipe } from './status-color.pipe';
import { FromMinorModule } from '../../../../from-minor';
import { TableComponent } from './table';
import { SpinnerModule } from '../../../../spinner';
import { StateNavModule } from '../../../../state-nav';
import { LanguageModule } from '../../../../language';
import { LastUpdatedModule } from '../last-updated/last-updated.module';
import { EmptyModule } from '../empty';

@NgModule({
    imports: [
        CommonModule,
        InvoicesRoutingModule,
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
        EmptyModule
    ],
    declarations: [InvoicesComponent, SearchFormComponent, InvoiceStatusColorPipe, TableComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class InvoicesModule {}
