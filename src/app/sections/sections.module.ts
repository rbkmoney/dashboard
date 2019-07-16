import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { OnboardingModule } from './onboarding';
import { ButtonsModule } from './buttons';
import { InputsModule } from './inputs/inputs.module';
import { ClaimsModule } from './claims';
import { SectionsComponent } from './sections.component';
import { PaymentSectionModule } from './payment-section';

@NgModule({
    imports: [
        OnboardingModule,
        MainModule,
        AnalyticsModule,
        PageNotFoundModule,
        ButtonsModule,
        InputsModule,
        // modules with routing module depends on order (TODO: maybe there is an error / problem)
        PaymentSectionModule,
        ClaimsModule,
        SectionsRoutingModule
        // end modules with routing
    ],
    declarations: [SectionsComponent],
    exports: [SectionsComponent]
})
export class SectionsModule {}
