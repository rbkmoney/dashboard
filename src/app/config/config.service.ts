import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type AppConfig = typeof import('../../assets/appConfig.json');
// tslint:disable-next-line:no-empty-interface
interface Config extends AppConfig {}

@Injectable()
export class ConfigService implements Config {
    api: Config['api'];
    daData: Config['daData'];
    konturFocus: Config['konturFocus'];

    constructor(private http: HttpClient) {}

    async init() {
        const appConfig = await this.http.get<Config>('/assets/appConfig.json').toPromise();
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
    }
}
