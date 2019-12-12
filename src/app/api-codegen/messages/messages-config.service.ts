import { Injectable } from '@angular/core';

import { ConfigService } from '../../config';
import { Configuration } from './swagger-codegen';

@Injectable()
export class MessagesConfigService extends Configuration {
    constructor({ api }: ConfigService) {
        super({ apiKeys: {}, basePath: api.messagesEndpoint });
    }
}
