import { Injectable } from '@angular/core';

import { ConfigService } from '../../config';
import { Configuration } from './swagger-codegen';

@Injectable()
export class WalletApiConfigService extends Configuration {
    constructor({ apiEndpoint }: ConfigService) {
        super({ apiKeys: {}, basePath: `${apiEndpoint}/wallet/v0` });
    }
}
