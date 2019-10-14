import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';

import { SettingsService } from '../settings';
import { Language } from './language';
import { angularLocaleData } from './angular-locale-data';

@Injectable()
export class LanguageService {
    private static readonly KEY = 'language';

    active: Language;

    constructor(private settingsService: SettingsService, private transloco: TranslocoService) {}

    async init() {
        const language = this.settingsService.get(LanguageService.KEY);
        const correctedLanguage = this.getCorrectLanguage(language);
        await this.change(correctedLanguage);
    }

    async change(language: Language) {
        registerLocaleData(angularLocaleData[language], language);
        if (language !== Language.en) {
            console.log(language);
            await import(`moment/locale/${language}`);
        }
        moment.locale(language);
        this.settingsService.set(LanguageService.KEY, language);
        this.transloco.setActiveLang(language);
        this.active = language;
    }

    private getCorrectLanguage(language: Language | string): Language {
        if (!Object.values(Language).includes(language)) {
            return this.getRecommended();
        }
        return language as Language;
    }

    private getRecommended(): Language {
        const language = navigator.language || (navigator as any).userLanguage;
        return Object.values(Language).includes(language) ? language : this.active || Language.ru;
    }
}
