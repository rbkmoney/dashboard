import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceDetailsModule, RefundDetailsModule as ApiRefundDetailsModule } from '@dsh/app/shared/components';
import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceModule } from '../../../../../api/invoice';
import { ToMajorModule } from '../../../../../to-major';
import { InvoiceRowHeaderComponent } from './components/invoice-row-header/invoice-row-header.component';
import { InvoiceRowComponent } from './components/invoice-row/invoice-row.component';
import { InvoicesListComponent } from './invoices-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        ToMajorModule,
        ApiModelRefsModule,
        InvoiceModule,
        ApiRefundDetailsModule,
        InvoiceDetailsModule,
    ],
    declarations: [InvoicesListComponent, InvoiceRowHeaderComponent, InvoiceRowComponent],
    exports: [InvoicesListComponent],
})
export class InvoicesListModule {}
