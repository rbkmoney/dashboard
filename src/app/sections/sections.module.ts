import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { OnboardingModule } from './onboarding';
import { ButtonsModule } from './buttons';
import { OperationsModule } from './operations/operations.module';
import { InputsModule } from './inputs/inputs.module';

@NgModule({
    imports: [
        SectionsRoutingModule,
        MainModule,
        AnalyticsModule,
        PageNotFoundModule,
        OnboardingModule,
        ButtonsModule,
        OperationsModule,
        InputsModule
    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class SectionsModule {}
