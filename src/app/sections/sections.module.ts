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
import { LAYOUT_GAP } from './constants';
import { OnboardingModule } from './onboarding';
import { ShopModule } from '../shop/shop.module';

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
        SectionsRoutingModule,
        ShopModule
    ],
    declarations: [SectionsComponent],
    exports: [SectionsComponent],
    providers: [{ provide: LAYOUT_GAP, useValue: '20px' }]
})
export class SectionsModule {}
