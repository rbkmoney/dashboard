import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main';
import { PartyMngModule } from './party-mgt';
import { DetailsModule } from './details';
import { PageNotFoundModule } from './page-not-found';
import { IconRegistryService } from './icon-registry.service';
import { TableModule } from './table';
import { APIModule } from './api/api.module';
import { ConfigService } from './config/config.service';

const initilizeFactory = (config: ConfigService) => () => Promise.all([config.init()]);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MainModule,
        PartyMngModule,
        DetailsModule,
        TableModule,
        PageNotFoundModule,
        APIModule
    ],
    providers: [
        IconRegistryService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initilizeFactory,
            deps: [ConfigService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
