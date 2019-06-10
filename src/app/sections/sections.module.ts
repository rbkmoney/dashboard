import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { AnalyticsModule } from './analytics';
import { PageNotFoundModule } from './page-not-found';
import { TableModule } from './table';
import { TabsModule } from './tabs/tabs-section.module';
import { OnboardingModule } from './onboarding';
import { ButtonsModule } from './buttons';

@NgModule({
    imports: [
        SectionsRoutingModule,
        MainModule,
        AnalyticsModule,
        PageNotFoundModule,
        TableModule,
        TabsModule
        TableModule,
        OnboardingModule,
        ButtonsModule
    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class SectionsModule {}
