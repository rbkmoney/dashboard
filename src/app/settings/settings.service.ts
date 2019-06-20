import { Injectable } from '@angular/core';
import localeRu from '@angular/common/locales/ru';

import themes from '../../themes/themes.json';
import { registerLocaleData } from '@angular/common';

type SettingsStorageKeys = 'language' | 'theme';
type SettingsStorageData = { [key in SettingsStorageKeys]: string };

const angularLocaleData = {
    ru: localeRu
};
const defaultLanguage = 'ru';
const supportedLanguages = ['ru'];


@Injectable()
export class SettingsService {
    get language() {
        let lang = this.get('language') || navigator.language || (navigator as any).userLanguage
        lang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
        registerLocaleData(angularLocaleData[lang], lang);

        return lang;
    }
    set language(language: string) {
        this.set({ language });
    }

    get theme() {
        return this.get('theme') || themes[0];
    }
    set theme(theme: string) {
        this.set({ theme });
    }

    constructor() {}

    private set(keyOrKeyValue: SettingsStorageKeys | Partial<SettingsStorageData>, value?: string) {
        if (typeof keyOrKeyValue === 'string') {
            return localStorage.setItem(this.getKeyName(keyOrKeyValue), value);
        }
        for (const [k, v] of Object.entries(keyOrKeyValue)) {
            this.set(k as SettingsStorageKeys, v);
        }
    }

    private get(key: SettingsStorageKeys) {
        return localStorage.getItem(this.getKeyName(key));
    }

    private getKeyName(name: SettingsStorageKeys) {
        return `dsh-${name}`;
    }
}
