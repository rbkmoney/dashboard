import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BaseConfig, Config } from './config';

@Injectable()
export class ConfigService extends BaseConfig {
    init$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        super();
    }

    async init({ configUrl }: { configUrl: string }) {
        const appConfig = await this.http.get<Config>(configUrl).toPromise();
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
        this.init$.next(true);
        this.init$.complete();
    }
}
