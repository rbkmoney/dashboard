import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { sliceArrayIntoChunks, sortByActiveStatus } from '../../../../../utils';
import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksLimit = 10;
    private webhooksState$ = new BehaviorSubject(null);
    private receiveWebhooks$ = new Subject();
    private getMoreWebhooks$ = new Subject();
    private webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter(s => !!s),
        map(w => w.sort(sortByActiveStatus)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhooksChunk$ = this.webhooks$.pipe(
        map(w => sliceArrayIntoChunks<Webhook>(w, this.webhooksLimit)[0]),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhooksReceived$ = this.webhooks$.pipe(
        map(s => !!s),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$ = progress(this.receiveWebhooks$, this.webhooksState$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$: Subject<boolean> = new Subject();

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.getMoreWebhooks$
            .pipe(
                booleanDebounceTime(),
                switchMap(() => this.webhooks$)
            )
            .subscribe(webhooks => {
                this.webhooksLimit = this.webhooksLimit + 10;
                this.hasMore$.next(webhooks.length > this.webhooksLimit);
                this.webhooksState$.next(webhooks);
            });

        this.receiveWebhooks$
            .pipe(
                switchMap(_ =>
                    this.webhooksService.getWebhooks().pipe(
                        catchError(err => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            this.webhooksState$.next(null);
                            return [];
                        })
                    )
                )
            )
            .subscribe(webhooks => {
                this.webhooksLimit = 10;
                this.hasMore$.next(webhooks.length > this.webhooksLimit);
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }

    getMoreWebhooks() {
        this.getMoreWebhooks$.next();
    }
}
