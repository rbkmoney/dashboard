import { Injectable } from '@angular/core';

import { ConfigService } from '../../config';
import { Configuration } from './openapi-codegen';

const DARK_API_PATH = 'dark-api/v1';

@Injectable()
export class SenderConfigService extends Configuration {
    constructor({ apiEndpoint }: ConfigService) {
        super({ apiKeys: {}, basePath: `${apiEndpoint}/${DARK_API_PATH}` });
    }
}
