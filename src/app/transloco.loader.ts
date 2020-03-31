import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader, TRANSLOCO_LOADER } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class HttpLoader implements TranslocoLoader {
    constructor(private http: HttpClient) {}

    getTranslation(langPath: string) {
        return this.http.get<Translation>(`/assets/i18n/${langPath}.json`);
    }
}

export const translocoLoader = { provide: TRANSLOCO_LOADER, useClass: HttpLoader };
