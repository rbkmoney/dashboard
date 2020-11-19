import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DetailsComponent } from './details.component';
import { RefundPipesModule } from '../refund-pipes';
import { MainInfoComponent } from './main-info';
import { RefundDetailsModule } from '../../../../../shared/components/api-model-details/refund-details';
import { InvoiceInfoComponent } from './invoice-info';
import { InvoiceDetailsModule } from '../../../../../shared/components/api-model-details/invoice-details';
import { PaymentInfoComponent } from './payment-info';
import { PaymentDetailsModule } from '../../../../../shared/components/api-model-details/payment-details';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatSnackBarModule,
        MatDividerModule,
        IndicatorsModule,
        ApiModelRefsModule,
        RefundPipesModule,
        RefundDetailsModule,
        InvoiceDetailsModule,
        PaymentDetailsModule,
    ],
    declarations: [DetailsComponent, MainInfoComponent, InvoiceInfoComponent, PaymentInfoComponent],
    exports: [DetailsComponent],
})
export class DetailsModule {}
