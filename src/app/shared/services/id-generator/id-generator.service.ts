import { Injectable } from '@angular/core';
import uuid from 'uuid';

import { genXRequestID } from '@dsh/api/utils';

@Injectable()
export class IdGeneratorService {
    generateUUID(): string {
        return uuid();
    }

    generateRequestID(): string {
        return genXRequestID();
    }
}
