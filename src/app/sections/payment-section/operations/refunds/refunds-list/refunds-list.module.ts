import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceModule } from '@dsh/api/invoice';
import { RefundDetailsModule as ApiRefundDetailsModule } from '@dsh/app/shared/components';
import { ApiModelRefsModule, ToMajorModule } from '@dsh/app/shared/pipes';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { RefundRowHeaderComponent } from './components/refund-row-header/refund-row-header.component';
import { RefundRowComponent } from './components/refund-row/refund-row.component';
import { RefundDetailsModule } from './refund-details';
import { RefundsListComponent } from './refunds-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        RefundDetailsModule,
        ToMajorModule,
        ApiModelRefsModule,
        InvoiceModule,
        ApiRefundDetailsModule,
    ],
    declarations: [RefundsListComponent, RefundRowHeaderComponent, RefundRowComponent],
    exports: [RefundsListComponent],
})
export class RefundsListModule {}
