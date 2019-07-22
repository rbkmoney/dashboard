import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import get from 'lodash.get';

import { SettingsService, supportedLanguages } from '../../settings';

const angularLocaleData: { [locale in typeof supportedLanguages[number]]: any } = {
    ru: localeRu
};

const STATIC_MARK = Symbol();

@Injectable()
export class LocaleDictionaryService {
    private dictionary;

    constructor(private http: HttpClient, private settingsService: SettingsService) {}

    async init({ localesUrl }: { localesUrl: string }): Promise<void> {
        const lang = this.settingsService.language;
        registerLocaleData(angularLocaleData[lang], lang);
        this.dictionary = await this.http
            .get(`${localesUrl}/${lang}.json`)
            .pipe(
                catchError(err => {
                    console.error('An error occurred while fetch locale dictionary', err);
                    return new Observable(observer => observer.complete());
                })
            )
            .toPromise();
    }

    mapDictionaryKey(key: string): string {
        if (!this.dictionary) {
            console.error('Locale dictionary is not defined');
            return key;
        } else if (!key) {
            return key;
        } else if (typeof key !== 'string' && typeof key !== 'number') {
            console.warn(`Key must be a number or a string. Get: ${typeof key} "${key}"`);
            return key;
        }
        const str = get(this.dictionary, key, STATIC_MARK);
        if (str === STATIC_MARK) {
            console.warn(`Unknown locale dictionary "${key}" key`);
            return key;
        }
        return str;
    }
}
