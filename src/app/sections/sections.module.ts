import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { ButtonsModule } from './buttons';
import { InputsModule } from './inputs/inputs.module';
import { SectionsComponent } from './sections.component';
import { PaymentSectionModule } from './payment-section';
import { PaymentDetailsModule } from './payment-details';
import { OnboardingModule } from './onboarding';

@NgModule({
    imports: [
        MainModule,
        AnalyticsModule,
        PageNotFoundModule,
        ButtonsModule,
        InputsModule,
        PaymentSectionModule,
        OnboardingModule,
        PaymentDetailsModule,
        SectionsRoutingModule
    ],
    declarations: [SectionsComponent],
    exports: [SectionsComponent]
})
export class SectionsModule {}
