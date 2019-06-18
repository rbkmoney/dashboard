import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable()
export class TranslationService {
    locale = {};

    constructor(private http: HttpClient) {
    }

    init(lang: string) {
        const path = `/assets/locales/${lang}.json`;

        this.http.get(path).pipe(tap(locale => this.locale = locale)).subscribe();
    }
}
