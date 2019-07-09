import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { OnboardingModule } from './onboarding';
import { ButtonsModule } from './buttons';
import { OperationsModule } from './payment-section/operations/operations.module';
import { InputsModule } from './inputs/inputs.module';
import { ClaimModule } from './claim';
import { SectionsComponent } from './sections.component';
import { PaymentSectionModule } from './payment-section';
import { PaymentDetailsModule } from './payment-details';

@NgModule({
    imports: [
        OnboardingModule,
        PaymentSectionModule,
        PaymentDetailsModule,
        SectionsRoutingModule,
        MainModule,
        AnalyticsModule,
        PageNotFoundModule,
        ButtonsModule,
        OperationsModule,
        InputsModule,
        ClaimModule
    ],
    declarations: [SectionsComponent],
    exports: [SectionsComponent]
})
export class SectionsModule {}
