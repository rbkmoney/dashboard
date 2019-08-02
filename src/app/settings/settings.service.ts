import { Injectable } from '@angular/core';

interface KeyValue {
    [name: string]: string;
}

@Injectable()
export class SettingsService {
    set(keyOrKeyValue: string | KeyValue, value?: string) {
        if (typeof keyOrKeyValue === 'string') {
            localStorage.setItem(this.getKeyName(keyOrKeyValue), value);
            return value;
        }
        for (const [k, v] of Object.entries(keyOrKeyValue)) {
            this.set(k, v);
        }
        return keyOrKeyValue;
    }

    get(key: string): string {
        return localStorage.getItem(this.getKeyName(key));
    }

    private getKeyName(name: string) {
        return `dsh-${name}`;
    }
}
