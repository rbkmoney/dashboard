import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SettingsService } from '../settings';

@Injectable()
export class LocaleService {
    locale = {};

    constructor(private http: HttpClient, private settingsService: SettingsService) {}

    async init() {
        const path = `/assets/locales/${this.settingsService.language}.json`;

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
