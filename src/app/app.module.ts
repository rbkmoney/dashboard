import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoConfig, TranslocoModule, TRANSLOCO_CONFIG } from '@ngneat/transloco';

import { ErrorModule, LoggerModule, UserModule } from '@dsh/app/shared/services';

import { ENV, environment } from '../environments';
import { OrganizationsModule } from './api';
import { APICodegenModule } from './api-codegen';
import { AppComponent } from './app.component';
import { AuthModule, KeycloakAngularModule, KeycloakService } from './auth';
import { ConfigModule, ConfigService } from './config';
import { HomeModule } from './core/home';
import { FeedbackModule } from './feedback';
import { IconsModule, IconsService } from './icons';
import { initializer } from './initializer';
import { LanguageService } from './language';
import { SectionsModule } from './sections';
import { SettingsModule } from './settings';
import { ThemeManager, ThemeManagerModule } from './theme-manager';
import { translocoLoader } from './transloco.loader';
import { YandexMetrikaConfigService, YandexMetrikaModule } from './yandex-metrika';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        SectionsModule,
        APICodegenModule,
        AuthModule,
        ThemeManagerModule,
        ConfigModule,
        HomeModule,
        SettingsModule,
        KeycloakAngularModule,
        HttpClientModule,
        TranslocoModule,
        YandexMetrikaModule,
        LoggerModule,
        ErrorModule,
        OrganizationsModule,
        UserModule,
        FeedbackModule,
        IconsModule,
    ],
    providers: [
        LanguageService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [
                ConfigService,
                KeycloakService,
                LanguageService,
                YandexMetrikaConfigService,
                PLATFORM_ID,
                ThemeManager,
                IconsService,
            ],
            multi: true,
        },
        {
            provide: LOCALE_ID,
            deps: [LanguageService],
            useFactory: (languageService: LanguageService) => languageService.active,
        },
        {
            provide: MAT_DATE_LOCALE,
            deps: [LanguageService],
            useFactory: (languageService: LanguageService) => languageService.active,
        },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        {
            provide: TRANSLOCO_CONFIG,
            useValue: {
                reRenderOnLangChange: false,
                defaultLang: 'ru',
                availableLangs: ['ru'],
                fallbackLang: 'ru',
                prodMode: environment.production,
            } as TranslocoConfig,
        },
        translocoLoader,
        { provide: ENV, useValue: environment },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
