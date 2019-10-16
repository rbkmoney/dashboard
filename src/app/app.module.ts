import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from '@angular/material-moment-adapter';
import { MatIconRegistry } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';

import { AppComponent } from './app.component';
import { AuthModule, KeycloakAngularModule, KeycloakService } from './auth';
import { initializer } from './initializer';
import { APICodegenModule } from './api-codegen';
import { SectionsModule } from './sections';
import { ThemeManagerModule } from './theme-manager';
import { ConfigModule, ConfigService } from './config';
import { SettingsModule } from './settings';
import { ContainerModule } from './container';
import { icons } from './icons';
import { environment } from '../environments/environment';
import { translocoLoader } from './transloco.loader';
import { LanguageService } from './language';

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
        ContainerModule,
        SettingsModule,
        KeycloakAngularModule,
        HttpClientModule,
        TranslocoModule
    ],
    providers: [
        LanguageService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigService, KeycloakService, LanguageService],
            multi: true
        },
        {
            provide: LOCALE_ID,
            deps: [LanguageService],
            useFactory: (languageService: LanguageService) => languageService.active
        },
        {
            provide: MAT_DATE_LOCALE,
            deps: [LanguageService],
            useFactory: (languageService: LanguageService) => languageService.active
        },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        {
            provide: TRANSLOCO_CONFIG,
            useValue: {
                listenToLangChange: false,
                defaultLang: 'ru',
                fallbackLang: 'ru',
                prodMode: environment.production,
                scopeStrategy: 'shared'
            } as TranslocoConfig
        },
        translocoLoader
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.registerIcons();
    }

    registerIcons() {
        for (const name of icons) {
            this.matIconRegistry.addSvgIcon(
                name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${name}.svg`)
            );
        }
        this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
    }
}
