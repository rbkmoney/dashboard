import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { LayoutModule } from '../../../../layout';
import { OperationsModule } from '../operations.module';
import { LocaleModule } from '../../../../locale';
import { TableModule } from '../../../../table';
import { FormControlsModule } from '../../../../form-controls';
import { DaterangeSelectorModule } from '../daterange-selector';
import { ButtonModule } from '../../../../button';
import { StatusModule } from '../../../../status';
import { InvoiceStatusColorPipe } from './status-color.pipe';

@NgModule({
    imports: [
        InvoicesRoutingModule,
        LayoutModule,
        OperationsModule,
        LocaleModule,
        TableModule,
        CommonModule,
        ReactiveFormsModule,
        FormControlsModule,
        FlexLayoutModule,
        DaterangeSelectorModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        ButtonModule,
        StatusModule,
        MatIconModule
    ],
    declarations: [InvoicesComponent, SearchFormComponent, InvoiceStatusColorPipe]
})
export class InvoicesModule {}
