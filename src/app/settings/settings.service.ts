import { Injectable } from '@angular/core';

import themes from '../../themes/themes.json';

type SettingsStorageKeys = 'language' | 'theme';
type SettingsStorageData = { [key in SettingsStorageKeys]: string };

@Injectable()
export class SettingsService {
    get language() {
        return this.get('language') || navigator.language || (navigator as any).userLanguage;
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
