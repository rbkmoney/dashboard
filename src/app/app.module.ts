import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import * as Sentry from '@sentry/angular';

import { ErrorModule, KeycloakTokenInfoModule } from '@dsh/app/shared/services';
import { QUERY_PARAMS_SERIALIZERS } from '@dsh/app/shared/services/query-params/utils/query-params-serializers';
import { createDateRangeWithPresetSerializer } from '@dsh/components/filters/date-range-filter';

import { ENV, environment } from '../environments';
import { OrganizationsModule } from './api';
import { ApiCodegenModule } from './api-codegen';
import { AppComponent } from './app.component';
import { AuthModule, KeycloakAngularModule, KeycloakService } from './auth';
import { ConfigModule, ConfigService } from './config';
import { FeedbackModule } from './feedback';
import { HomeModule } from './home';
import { IconsModule, IconsService } from './icons';
import { initializer } from './initializer';
import { IntegrationModule, IntegrationService } from './integration';
import { LanguageService } from './language';
import { SectionsModule } from './sections';
import { SentryErrorHandler } from './sentry-error-handler.service';
import { SentryHttpInterceptor } from './sentry-http-interceptor';
import { SettingsModule } from './settings';
import { ThemeManager, ThemeManagerModule } from './theme-manager';
import { TranslocoHttpLoaderService } from './transloco-http-loader.service';
import { YandexMetrikaConfigService, YandexMetrikaModule } from './yandex-metrika';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        SectionsModule,
        ApiCodegenModule,
        AuthModule,
        ThemeManagerModule,
        ConfigModule,
        HomeModule,
        SettingsModule,
        KeycloakAngularModule,
        HttpClientModule,
        TranslocoModule,
        YandexMetrikaModule,
        ErrorModule,
        OrganizationsModule,
        FeedbackModule,
        IconsModule,
        KeycloakTokenInfoModule,
        FlexLayoutModule,
        IntegrationModule,
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
                IntegrationService,
                Sentry.TraceService,
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
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
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
        { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoaderService },
        { provide: ENV, useValue: environment },
        {
            provide: ErrorHandler,
            useClass: SentryErrorHandler,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SentryHttpInterceptor,
            multi: true,
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: QUERY_PARAMS_SERIALIZERS,
            useValue: [createDateRangeWithPresetSerializer()],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
