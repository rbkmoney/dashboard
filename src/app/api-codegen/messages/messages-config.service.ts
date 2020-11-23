import { Injectable } from '@angular/core';

import { ConfigService } from '../../config';
import { Configuration } from './openapi-codegen';

@Injectable()
export class MessagesConfigService extends Configuration {
    constructor({ apiEndpoint }: ConfigService) {
        super({ apiKeys: {}, basePath: `${apiEndpoint}/dark-api/v1` });
    }
}
