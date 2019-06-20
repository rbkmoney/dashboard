import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

import { SettingsService } from '../settings';

const angularLocaleData = {
    ru: localeRu
};

@Injectable()
export class LocaleService {
    locale = {};

    constructor(private http: HttpClient, private settingsService: SettingsService) {}

    async init() {
        const lang = this.settingsService.language;registerLocaleData(angularLocaleData[lang], lang);
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
