import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { InvoiceDetailsModule } from '@dsh/app/shared/components';
import { InvoiceModule } from '@dsh/api/invoice';
import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { FormControlsModule, RangeDatepickerModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule, StateNavModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';
import { TableModule } from '@dsh/components/table';

import { LanguageModule } from '../../../../language';
import { ToMajorModule } from '../../../../to-major';
import { CreateInvoiceModule } from '../../../create-invoice';
import { ShopSelectorModule } from '../../../shop-selector';
import { CreateInvoiceDialogComponent } from './create-invoice-dialog';
import { InvoicesListModule } from './invoices-list';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesSearchFiltersModule } from './invoices-search-filters';
import { InvoicesComponent } from './invoices.component';

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
        ToMajorModule,
        MatSnackBarModule,
        StateNavModule,
        TranslocoModule,
        LanguageModule,
        MatMenuModule,
        RangeDatepickerModule,
        EmptySearchResultModule,
        MatDialogModule,
        InvoiceModule,
        MatDatepickerModule,
        MatDividerModule,
        ShopSelectorModule,
        CreateInvoiceModule,
        InvoicesSearchFiltersModule,
        InvoiceDetailsModule,
        InvoicesListModule,
        ScrollUpModule,
        ShowMorePanelModule,
    ],
    declarations: [InvoicesComponent, CreateInvoiceDialogComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }],
})
export class InvoicesModule {}
