import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { IconRegistryService } from './icon-registry.service';
import { AuthModule } from './auth';
import { initializer } from './initializer';
import { APIModule } from './api';
import { SectionsModule } from './sections';
import { KeycloakService } from './auth/keycloak';
import { ThemeService, ThemeModule } from './theme';
import { ConfigModule, ConfigService } from './config';
import { LayoutModule } from './layout';
import { SettingsModule, SettingsService } from './settings';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        SectionsModule,
        APIModule,
        AuthModule,
        ThemeModule,
        ConfigModule,
        LayoutModule,
        SettingsModule
    ],
    providers: [
        IconRegistryService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigService, KeycloakService, ThemeService],
            multi: true
        },
        {
            provide: LOCALE_ID,
            deps: [SettingsService],
            useFactory: (settingsService: SettingsService) => settingsService.language
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
