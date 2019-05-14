import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@Injectable()
export class SettingsService {
    get language() {
        return navigator.language || (navigator as any).userLanguage;
    }

    constructor() {}
}
