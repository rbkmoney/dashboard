import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { TableModule } from './table';
import { OnboardingModule } from './onboarding';
import { ButtonsModule } from './buttons';
import { ButtonToggleModule } from './button-toggle';
import { InputsModule } from './inputs/inputs.module';

@NgModule({
    imports: [
        SectionsRoutingModule,
        MainModule,
        AnalyticsModule,
        PageNotFoundModule,
        TableModule,
        OnboardingModule,
        ButtonsModule,
        ButtonToggleModule
        InputsModule
    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class SectionsModule {}
