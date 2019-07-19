import { Injectable } from '@angular/core';

import { config as appConfig } from './config-stub';
import { BaseConfig } from './config';

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
