import { Injectable } from '@angular/core';

import { BASE_CONFIG } from './config';
import { config as appConfig } from './config-stub';

@Injectable()
export class ConfigStubService extends BASE_CONFIG {
    constructor() {
        super();
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async init() {}
}
