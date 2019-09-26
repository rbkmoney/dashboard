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

    constructor(private settingsService: SettingsService, private transloco: TranslocoService) {
        const language = this.settingsService.get(LanguageService.KEY);
        const correctedLanguage = this.getCorrectLanguage(language);
        this.change(correctedLanguage);
    }

    change(language: Language) {
        moment.locale(language);
        registerLocaleData(angularLocaleData[language], language);
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
