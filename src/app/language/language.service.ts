import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';

import { SettingsService } from '../settings';
import { ANGULAR_LOCALE_DATA } from './angular-locale-data';
import { Language } from './language';

@Injectable()
export class LanguageService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private static readonly KEY = 'language';

    // eslint-disable-next-line @typescript-eslint/member-ordering
    active: Language;

    constructor(private settingsService: SettingsService, private transloco: TranslocoService) {}

    async init() {
        const language = this.settingsService.getLocalStorageItem(LanguageService.KEY);
        const correctedLanguage = this.getCorrectLanguage(language);
        await this.change(correctedLanguage);
    }

    async change(language: Language) {
        registerLocaleData(ANGULAR_LOCALE_DATA[language], language);
        if (language !== Language.En) {
            await import(`moment/locale/${language}`);
        }
        moment.locale(language);
        this.settingsService.setLocalStorageItem(LanguageService.KEY, language);
        this.transloco.setActiveLang(language);
        this.active = language;
    }

    private getCorrectLanguage(language: Language | string): Language {
        if (!Object.values<string>(Language).includes(language)) {
            return this.getRecommended();
        }
        return language as Language;
    }

    private getRecommended(): Language {
        const language = navigator.language || (navigator as any).userLanguage;
        return Object.values(Language).includes(language) ? language : this.active || Language.Ru;
    }
}
