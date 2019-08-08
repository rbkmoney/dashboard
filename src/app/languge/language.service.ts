import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';

import { SettingsService } from '../settings';

type AngularLocaleData<N extends string = string> = {
    [name in N]: any;
};

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

    init<S extends ArrayLike<any> = ArrayLike<any>>(
        supportedLanguages: S,
        defaultLanguage: S[number],
        angularLocaleData: AngularLocaleData<S[number]>
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
            return this.getRecomended();
        }
        return language;
    }

    private getRecomended() {
        const language = navigator.language || (navigator as any).userLanguage;
        return this.supported.includes(language) ? language : this.default;
    }
}
