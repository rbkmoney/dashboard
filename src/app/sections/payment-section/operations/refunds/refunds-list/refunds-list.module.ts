import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { RefundRowComponent } from './refund-row';
import { RefundRowHeaderComponent } from './refund-row-header';
import { RefundsListComponent } from './refunds-list.component';
import { DetailsModule } from '../details';
import { RefundPipesModule } from '../refund-pipes';
import { ToMajorModule } from '../../../../../to-major';
import { ApiModelRefsModule } from '@dsh/app/shared/*';
import { InvoiceModule } from '../../../../../api/invoice';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        DetailsModule,
        RefundPipesModule,
        ToMajorModule,
        ApiModelRefsModule,
        InvoiceModule,
    ],
    declarations: [RefundsListComponent, RefundRowHeaderComponent, RefundRowComponent],
    exports: [RefundsListComponent],
})
export class RefundsListModule {}
