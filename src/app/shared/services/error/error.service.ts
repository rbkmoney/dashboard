import { Injectable } from '@angular/core';

import { NotificationService } from '../notification';

// TODO: collect error information
@Injectable()
export class ErrorService {
    constructor(private notificationService: NotificationService) {}

    error(error: any, messageOrGetType?: Parameters<NotificationService['error']>[0]) {
        // TODO: parse error by instance for error clarification (message)
        return this.notificationService.error(messageOrGetType);
    }
}
