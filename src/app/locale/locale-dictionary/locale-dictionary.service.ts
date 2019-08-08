import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import get from 'lodash.get';
import template from 'lodash.template';

import { LanguageService } from '../../languge/language.service';

const STATIC_MARK = Symbol();

type LocalesUrls<L extends string = string> = {
    [language in L]: string;
};

@Injectable()
export class LocaleDictionaryService {
    private dictionary: any;

    constructor(private http: HttpClient, private languageService: LanguageService) {}

    async init<L extends string = string>(localesUrls: LocalesUrls<L>): Promise<void> {
        this.dictionary = await this.http
            .get(localesUrls[this.languageService.language] || localesUrls[this.languageService.default])
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
        const str = get(this.dictionary, key, STATIC_MARK);
        if (str === STATIC_MARK) {
            console.warn(`Unknown locale dictionary "${key}" key`);
            return key;
        }
        if (templateData) {
            return template(str)(templateData);
        }
        return str;
    }
}
