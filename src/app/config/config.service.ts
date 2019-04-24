import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Config = typeof import('../../assets/appConfig.json');

@Injectable()
export class ConfigService {
    api: Config['api'];
    daData: Config['daData'];

    constructor(private http: HttpClient) {}

    async init() {
        const appConfig = await this.http.get<Config>('/assets/appConfig.json').toPromise();
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
    }
}
