import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_CONFIG, Config } from './config';

@Injectable()
export class ConfigService extends BASE_CONFIG {
    constructor(private http: HttpClient) {
        super();
    }

    async init({ configUrl }: { configUrl: string }) {
        const appConfig = await this.http.get<Config>(configUrl).toPromise();
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
    }
}
