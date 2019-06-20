import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { SettingsService } from '../settings';

const angularLocaleData = {
    ru: localeRu
};
const defaultLanguage = 'ru';
const supportedLanguages = ['ru'];

@Injectable()
export class LocaleService {
    locale = {};

    constructor(private http: HttpClient, private settingsService: SettingsService) {}

    async init() {
        let lang = this.settingsService.language;
        lang = supportedLanguages.includes(lang) ? lang : defaultLanguage;

        registerLocaleData(angularLocaleData[lang], lang);

        const path = `/assets/locales/${lang}.json`;

        this.locale = await this.http
            .get(path)
            .pipe(
                catchError(err => {
                    console.error(err);
                    return new Observable(observer => {
                        observer.complete();
                    });
                })
            )
            .toPromise();
    }
}
