import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';

import { SettingsService } from '../../settings';
import { Language } from './language';
import { angularLocaleData } from './angular-locale-data';

@Injectable()
export class LanguageService {
    private static readonly KEY = 'language';

    get language(): Language {
        return this.getCorrectLanguage(this.settingsService.get(LanguageService.KEY));
    }
    set language(value: Language) {
        if (value !== this.language) {
            this.setLanguage(value);
        }
    }

    constructor(private settingsService: SettingsService) {
        this.setLanguage(this.language);
    }

    private setLanguage(value: Language | string) {
        const language = this.getCorrectLanguage(value);
        moment.locale(language);
        registerLocaleData(angularLocaleData[language], language);
        this.settingsService.set(LanguageService.KEY, language);
    }

    private getCorrectLanguage(language: Language | string) {
        if (!Object.values(Language).includes(language)) {
            return this.getRecomended();
        }
        return language;
    }

    private getRecomended() {
        const language = navigator.language || (navigator as any).userLanguage;
        return Object.values(Language).includes(language) ? language : this.language || Language.ru;
    }
}
