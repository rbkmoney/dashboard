import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, first, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

const WEBHOOK_LIMIT = 10;

@Injectable()
export class ReceiveWebhooksService {
    private webhooksOffset$: BehaviorSubject<number> = new BehaviorSubject(WEBHOOK_LIMIT);
    private webhooksState$: BehaviorSubject<Webhook[]> = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<void> = new Subject();

    webhooks$: Observable<any> = this.webhooksState$.pipe(
        filter(s => !!s),
        map(w => sortBy(w, i => !i.active)),
        switchMap(webhhoks => combineLatest([this.webhooksOffset$, of(webhhoks)])),
        map(([offset, webhooks]) => webhooks.slice(0, offset))
    );

    webhooksReceived$: Observable<boolean> = this.webhooksState$.pipe(
        map(s => !!s),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$: Observable<boolean> = progress(this.receiveWebhooks$, this.webhooksState$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$: Observable<boolean> = combineLatest([this.webhooksState$, this.webhooksOffset$]).pipe(
        map(([webhooks, offset]) => webhooks?.length > offset)
    );

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.queryParams
            .pipe(
                first(),
                pluck('offset'),
                filter(l => !!l),
                map(offset => parseInt(offset, 10))
            )
            .subscribe(offset => {
                this.webhooksOffset$.next(offset);
            });

        this.webhooksOffset$.subscribe(offset => {
            this.router.navigate([location.pathname], {
                queryParams: {
                    offset
                }
            });
        });

        this.receiveWebhooks$
            .pipe(
                switchMap(() =>
                    this.webhooksService.getWebhooks().pipe(
                        catchError(err => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            return of([]);
                        })
                    )
                )
            )
            .subscribe(webhooks => {
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }

    getMoreWebhooks() {
        this.webhooksOffset$.next(this.webhooksOffset$.value + WEBHOOK_LIMIT);
    }
}
