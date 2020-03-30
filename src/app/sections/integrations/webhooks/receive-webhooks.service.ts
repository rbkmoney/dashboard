import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { Webhook } from '../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../api/webhooks';
import { booleanDelay } from '../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksState$ = new BehaviorSubject(null);
    private webhooksError$ = new BehaviorSubject(false);
    private receiveWebhooks$ = new Subject();

    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter(s => !!s),
        shareReplay(1)
    );

    webhooksReceived$ = this.webhooks$.pipe(
        booleanDelay(),
        map(r => !r)
    );

    error$: Observable<any> = this.webhooksError$.asObservable();

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.receiveWebhooks$.pipe(switchMap(_ => this.webhooksService.getWebhooks())).subscribe(
            webhooks => this.webhooksState$.next(webhooks),
            err => {
                console.error(err);
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                this.webhooksError$.next(true);
            }
        );
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }
}
