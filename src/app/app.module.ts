import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { IconRegistryService } from './icon-registry.service';
import { AuthModule } from './auth';
import { initializer } from './initializer';
import { APIModule } from './api';
import { SectionsModule } from './sections';
import { KeycloakService } from './auth/keycloak';
import { ThemeService, ThemeModule } from './theme';
import { ConfigModule, ConfigService } from './config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        SectionsModule,
        APIModule,
        AuthModule,
        ThemeModule,
        ConfigModule
    ],
    providers: [
        IconRegistryService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigService, KeycloakService, ThemeService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
