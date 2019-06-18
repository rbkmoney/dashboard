import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Config } from './config';

@Injectable()
export class ConfigService implements Config {
    api: Config['api'];
    daData: Config['daData'];
    konturFocus: Config['konturFocus'];
    ext: Config['ext'];

    constructor(private http: HttpClient) {}

    async init() {
        const appConfig = await this.http.get<Config>('/assets/appConfig.json').toPromise();
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
    }
}
