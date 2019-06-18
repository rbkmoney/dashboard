import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings';

@Injectable()
export class LocaleService {
    locale = {};

    constructor(private http: HttpClient, private settingsService: SettingsService) {}

    async init() {
        const lang = this.settingsService.language;
        const path = `/assets/locales/${lang}.json`;

        this.locale = await this.http.get(path).toPromise();
    }
}
