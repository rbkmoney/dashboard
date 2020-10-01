import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule, DonutChartModule } from '@dsh/components/charts';
import { RangeDatepickerModule } from '@dsh/components/form-controls';
import { SpinnerModule } from '@dsh/components/indicators';
import { JustifyWrapperModule, LayoutModule } from '@dsh/components/layout';

import { AnalyticsModule as APIAnalyticsModule } from '../../../api/analytics';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { AveragePaymentModule } from './average-payment';
import { PaymentSplitAmountModule } from './payment-split-amount';
import { PaymentSplitCountModule } from './payment-split-count';
import { PaymentsAmountModule } from './payments-amount';
import { PaymentsCountModule } from './payments-count';
import { PaymentsErrorDistributionModule } from './payments-error-distribution';
import { PaymentsToolDistributionModule } from './payments-tool-distribution';
import { PercentDifferenceModule } from './percent-difference';
import { RefundsAmountModule } from './refunds-amount';
import { SearchFiltersModule } from './search-filters';

@NgModule({
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        TranslocoModule,
        JustifyWrapperModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        BarChartModule,
        DonutChartModule,
        APIAnalyticsModule,
        RangeDatepickerModule,
        SpinnerModule,
        PercentDifferenceModule,
        PaymentSplitCountModule,
        PaymentsToolDistributionModule,
        AveragePaymentModule,
        PaymentsAmountModule,
        PaymentsCountModule,
        RefundsAmountModule,
        PaymentSplitAmountModule,
        PaymentsErrorDistributionModule,
        SearchFiltersModule,
    ],
    declarations: [AnalyticsComponent],
})
export class AnalyticsModule {}
