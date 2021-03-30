import { Injectable } from '@angular/core';

import { BaseConfig } from './config';
import { config as appConfig } from './config-stub';

@Injectable()
export class ConfigStubService extends BaseConfig {
    constructor() {
        super();
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
    }

    async init() {}
}
