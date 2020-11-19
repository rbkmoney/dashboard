import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, RefundDetailsModule } from '@dsh/app/shared/*';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceModule } from '../../../../../api/invoice';
import { ToMajorModule } from '../../../../../to-major';
import { DetailsModule } from '../details';
import { RefundRowComponent } from './refund-row';
import { RefundRowHeaderComponent } from './refund-row-header';
import { RefundsListComponent } from './refunds-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        DetailsModule,
        ToMajorModule,
        ApiModelRefsModule,
        InvoiceModule,
        RefundDetailsModule,
    ],
    declarations: [RefundsListComponent, RefundRowHeaderComponent, RefundRowComponent],
    exports: [RefundsListComponent],
})
export class RefundsListModule {}
