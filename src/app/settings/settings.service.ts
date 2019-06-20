import { Injectable } from '@angular/core';

type SettingsStorageKeys = 'language' | 'theme';
type SettingsStorageData = { [key in SettingsStorageKeys]: string };

const defaultLanguage = 'ru';
const supportedLanguages = ['ru'];

@Injectable()
export class SettingsService {
    get language() {
        let lang = this.get('language') || navigator.language || (navigator as any).userLanguage;
        lang = supportedLanguages.includes(lang) ? lang : defaultLanguage;

        return lang;
    }
    set language(language: string) {
        this.set({ language });
    }

    get theme() {
        return this.get('theme');
    }
    set theme(theme: string) {
        this.set({ theme });
    }

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
