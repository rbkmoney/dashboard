import { Injectable } from '@angular/core';

import { config as appConfig } from './config-stub';
import { Config } from './config';

@Injectable()
export class ConfigStubService implements Config {
    api: Config['api'];
    daData: Config['daData'];
    konturFocus: Config['konturFocus'];
    ext: Config['ext'];

    constructor() {
        for (const [name, config] of Object.entries(appConfig)) {
            this[name] = config;
        }
    }

    async init() {}
}
