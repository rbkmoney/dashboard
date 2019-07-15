import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter,
    MAT_MOMENT_DATE_FORMATS
} from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { IconRegistryService } from './icon-registry.service';
import { AuthModule } from './auth';
import { initializer } from './initializer';
import { APIModule } from './api';
import { SectionsModule } from './sections';
import { KeycloakService, KeycloakAngularModule } from './auth';
import { ThemeManagerModule } from './theme-manager';
import { ConfigModule, ConfigService } from './config';
import { SettingsModule, SettingsService } from './settings';
import { ContainerModule } from './container';
import { LocaleDictionaryModule, LocaleDictionaryService } from './locale/locale-dictionary';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        SectionsModule,
        APIModule,
        AuthModule,
        ThemeManagerModule,
        ConfigModule,
        ContainerModule,
        SettingsModule,
        LocaleDictionaryModule,
        KeycloakAngularModule
    ],
    providers: [
        IconRegistryService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigService, KeycloakService, LocaleDictionaryService, SettingsService],
            multi: true
        },
        {
            provide: LOCALE_ID,
            deps: [SettingsService],
            useFactory: (settingsService: SettingsService) => settingsService.language
        },
        {
            provide: MAT_DATE_LOCALE,
            deps: [SettingsService],
            useFactory: (settingsService: SettingsService) => settingsService.language
        },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
