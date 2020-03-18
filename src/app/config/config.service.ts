import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseConfig, Config } from './config';

@Injectable()
export class ConfigService extends BaseConfig {
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
