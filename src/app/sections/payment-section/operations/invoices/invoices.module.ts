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
    MatSnackBarModule
} from '@angular/material';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { DaterangeSelectorModule } from '../daterange-selector';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { TableModule } from '../../../../table';
import { SearchFormComponent } from './search-form';
import { FormControlsModule } from '../../../../form-controls';
import { InvoicesComponent } from './invoices.component';
import { StatusModule } from '../../../../status';
import { ViewUtilsModule } from '../../../../view-utils';
import { DropdownModule } from '../../../../dropdown';
import { StateNavModule } from '../../../../state-nav';
import { LanguageModule } from '../../../../language';
import { LastUpdatedModule } from '../last-updated/last-updated.module';

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
        MatDatepickerModule,
        MatSelectModule,
        FormControlsModule,
        DaterangeSelectorModule,
        StatusModule,
        ViewUtilsModule,
        LastUpdatedModule,
        MatSnackBarModule,
        DropdownModule,
        StateNavModule,
        TranslocoModule,
        LanguageModule
    ],
    declarations: [InvoicesComponent, SearchFormComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class InvoicesModule {}
