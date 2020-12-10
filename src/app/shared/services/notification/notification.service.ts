import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { MessageOrGetType } from './types/get-type';
import { Type } from './types/type';

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    success(messageOrGetType: MessageOrGetType = (t) => t.default) {
        const message =
            typeof messageOrGetType === 'string'
                ? messageOrGetType
                : this.transloco.translate(`notification.success.${messageOrGetType(Type)}`);
        return this.snackBar.open(message, this.transloco.translate('notification.ok'), { duration: 3000 });
    }

    error(messageOrGetType: MessageOrGetType = (t) => t.default) {
        const message =
            typeof messageOrGetType === 'string'
                ? messageOrGetType
                : this.transloco.translate(`notification.error.${messageOrGetType(Type)}`);
        return this.snackBar.open(message, this.transloco.translate('notification.ok'), { duration: 3000 });
    }
}
