import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';

import { SettingsService } from '../settings';

interface AngularLocaleData {
    [name: string]: any;
}

@Injectable()
export class LanguageService {
    static readonly KEY = 'language';

    angularLocaleData: AngularLocaleData;
    supported: string[];
    default: string;

    get language(): string {
        return this.getCorrectLanguage(this.settingsService.get(LanguageService.KEY));
    }
    set language(value: string) {
        if (value !== this.language) {
            this.setLanguage(value);
        }
    }

    constructor(private settingsService: SettingsService) {}

    init<L extends AngularLocaleData = AngularLocaleData>(
        supportedLanguages: ArrayLike<any>,
        defaultLanguage: string,
        angularLocaleData: L
    ) {
        this.supported = Array.from(supportedLanguages);
        this.default = defaultLanguage;
        this.angularLocaleData = angularLocaleData;
        this.setLanguage(this.language);
    }

    private setLanguage(value: string) {
        const language = this.getCorrectLanguage(value);
        moment.locale(language);
        registerLocaleData(this.angularLocaleData[language], language);
        this.settingsService.set(LanguageService.KEY, language);
    }

    private getCorrectLanguage(language: string) {
        if (!this.supported.includes(language)) {
            return this.default;
        }
        return language;
    }
}
