import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksLimit = 9;

    private webhooksState$ = new BehaviorSubject(null);
    private webhooksError$ = new BehaviorSubject(false);
    private receiveWebhooks$ = new Subject();

    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter(s => !!s),
        shareReplay(SHARE_REPLAY_CONF)
    );

    error$: Observable<any> = this.webhooksError$.asObservable();

    hasMore$: Subject<boolean> = new Subject();

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.receiveWebhooks$
            .pipe(
                switchMap(_ =>
                    this.webhooksService.getWebhooks().pipe(
                        catchError(err => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            this.webhooksError$.next(true);
                            return [];
                        })
                    )
                )
            )
            .subscribe(webhooks => this.webhooksState$.next(webhooks));
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }
}
