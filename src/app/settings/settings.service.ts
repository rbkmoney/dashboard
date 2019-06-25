import { Injectable } from '@angular/core';

type SettingsStorageKeys = 'language' | 'theme';
type SettingsStorageData = { [key in SettingsStorageKeys]: string };

export enum SupportedLanguages {
    ru = 'ru'
}
export const defaultLanguage = SupportedLanguages.ru;

@Injectable()
export class SettingsService implements SettingsStorageData {
    get language() {
        return this.get('language');
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

    constructor() {
        this.init();
    }

    init() {
        if (!this.get('language')) {
            const language = navigator.language || (navigator as any).userLanguage;
            this.language = Object.values(SupportedLanguages).includes(language) ? language : defaultLanguage;
        }
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
