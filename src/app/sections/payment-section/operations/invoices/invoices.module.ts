import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule, RangeDatepickerModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { TableModule } from '@dsh/components/table';

import { FromMinorModule } from '../../../../from-minor';
import { LanguageModule } from '../../../../language';
import { EmptySearchResultModule } from '../../empty-search-result';
import { LastUpdatedModule } from '../last-updated/last-updated.module';
import { CreateInvoiceDialogComponent } from './create-invoice-dialog';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SearchFormComponent } from './search-form';
import { InvoiceStatusColorPipe } from './status-color.pipe';
import { TableComponent } from './table';

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
        IndicatorsModule,
        FromMinorModule,
        LastUpdatedModule,
        MatSnackBarModule,
        StateNavModule,
        TranslocoModule,
        LanguageModule,
        MatMenuModule,
        RangeDatepickerModule,
        EmptySearchResultModule,
        MatDialogModule
    ],
    declarations: [
        InvoicesComponent,
        SearchFormComponent,
        InvoiceStatusColorPipe,
        TableComponent,
        CreateInvoiceDialogComponent
    ],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class InvoicesModule {}
