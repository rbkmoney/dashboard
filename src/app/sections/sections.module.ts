import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { OnboardingModule } from './onboarding';
import { ButtonsModule } from './buttons';
import { OperationsModule } from './payment-section/operations';
import { InputsModule } from './inputs/inputs.module';
import { ClaimModule } from './claim';
import { SectionsComponent } from './sections.component';
import { PaymentSectionModule } from './payment-section';
import { PaymentDetailsModule } from './payment-details';
import { LAYOUT_GAP } from './constants';

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
    exports: [SectionsComponent],
    providers: [{ provide: LAYOUT_GAP, useValue: '20px' }]
})
export class SectionsModule {}
