import { Injectable } from '@angular/core';
import * as moment from 'moment';

const settingsStorageKeys = ['language', 'theme'] as const;

type SettingsStorageData = { [key in typeof settingsStorageKeys[number]]: string };

export const supportedLanguages = ['ru'] as const;

export const defaultLanguage = supportedLanguages[0];

@Injectable()
export class SettingsService implements SettingsStorageData {
    get language() {
        return this.get('language');
    }
    set language(language: string) {
        this.set({ language });
        moment.locale(language);
    }

    get theme() {
        return this.get('theme');
    }
    set theme(theme: string) {
        this.set({ theme });
    }

    async init() {
        if (!this.language) {
            const language = navigator.language || (navigator as any).userLanguage;
            this.language = supportedLanguages.includes(language) ? language : defaultLanguage;
        }
        for (const key of settingsStorageKeys) {
            this[key] = this[key];
        }
    }

    private set(keyOrKeyValue: keyof SettingsStorageData | Partial<SettingsStorageData>, value?: string) {
        if (typeof keyOrKeyValue === 'string') {
            return localStorage.setItem(this.getKeyName(keyOrKeyValue), value);
        }
        for (const [k, v] of Object.entries(keyOrKeyValue)) {
            this.set(k as keyof SettingsStorageData, v);
        }
    }

    private get(key: keyof SettingsStorageData) {
        return localStorage.getItem(this.getKeyName(key));
    }

    private getKeyName(name: keyof SettingsStorageData) {
        return `dsh-${name}`;
    }
}
