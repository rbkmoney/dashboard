import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import get from 'lodash.get';
import template from 'lodash.template';

import { LanguageService, Language } from '../language';

@Injectable()
export class LocaleDictionaryService {
    private dictionary: any;

    constructor(private http: HttpClient, private languageService: LanguageService) {}

    async init(localesUrls: { [language in Language]: string }): Promise<void> {
        this.dictionary = await this.http
            .get(localesUrls[this.languageService.language])
            .pipe(
                catchError(err => {
                    console.error('An error occurred while fetch locale dictionary', err);
                    return new Observable(observer => observer.complete());
                })
            )
            .toPromise();
    }

    mapDictionaryKey(key: string, templateData?: object): string {
        if (!this.dictionary) {
            console.error('Locale dictionary is not defined');
            return key;
        } else if (!key) {
            return key;
        } else if (typeof key !== 'string' && typeof key !== 'number') {
            console.warn(`Key must be a number or a string. Get: ${typeof key} "${key}"`);
            return key;
        }
        const defaultMark = Symbol();
        const str = get(this.dictionary, key, defaultMark);
        if (str === defaultMark) {
            console.warn(`Unknown locale dictionary "${key}" key`);
            return key;
        }
        if (templateData) {
            return template(str)(templateData);
        }
        return str;
    }
}
