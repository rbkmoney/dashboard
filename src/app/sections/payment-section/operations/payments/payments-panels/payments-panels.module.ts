import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BalanceModule } from '@dsh/app/shared/components/balance/balance.module';
import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, CardModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { PaymentsRowHeaderComponent } from './components/row-header/payments-row-header.component';
import { PaymentsRowComponent } from './components/row/payments-row.component';
import { PaymentDetailHeaderModule } from './payment-detail-header';
import { PaymentStatusModule } from './payment-status';
import { PaymentsDetailsModule } from './payments-details';
import { PaymentsPanelsComponent } from './payments-panels.component';

@NgModule({
    imports: [
        CommonModule,
        RowModule,
        FlexLayoutModule,
        TranslocoModule,
        SpinnerModule,
        EmptySearchResultModule,
        AccordionModule,
        CardModule,
        ShowMorePanelModule,
        PaymentDetailHeaderModule,
        PaymentsDetailsModule,
        BalanceModule,
        PaymentStatusModule,
        ApiModelRefsModule,
    ],
    declarations: [PaymentsPanelsComponent, PaymentsRowHeaderComponent, PaymentsRowComponent],
    exports: [PaymentsPanelsComponent],
})
export class PaymentsPanelsModule {}
