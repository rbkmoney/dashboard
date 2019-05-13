import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { PartyMngModule } from './party-mgt';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { TableModule } from './table';
import { OnboardingModule } from './onboarding';

@NgModule({
    imports: [
        SectionsRoutingModule,
        MainModule,
        PartyMngModule,
        AnalyticsModule,
        PageNotFoundModule,
        TableModule,
        OnboardingModule
    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class SectionsModule {}
