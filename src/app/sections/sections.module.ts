import { NgModule } from '@angular/core';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainModule } from './main';
import { PartyMngModule } from './party-mgt';
import { AnalyticsModule } from './analytics';
import { DetailsModule } from './details';
import { PageNotFoundModule } from './page-not-found';
import { TableModule } from './table';
import { TabsModule } from './tabs/tabs.module';

@NgModule({
    imports: [
        SectionsRoutingModule,
        MainModule,
        PartyMngModule,
        AnalyticsModule,
        DetailsModule,
        PageNotFoundModule,
        TableModule,
        TabsModule
    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class SectionsModule {}
