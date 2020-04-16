import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import chunk from 'lodash.chunk';
import sortBy from 'lodash.sortby';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksLimit$: BehaviorSubject<number> = new BehaviorSubject(10);
    private webhooksState$: BehaviorSubject<Webhook[]> = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<'new' | 'more'> = new Subject();
    private cache: Webhook[] = [];

    private webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter(s => !!s),
        map(w => sortBy(w, i => !i.active)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhooksChunk$: Observable<Webhook[]> = this.webhooks$.pipe(
        map(w => chunk(w, this.webhooksLimit$.value)[0]),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhooksReceived$: Observable<boolean> = this.webhooksChunk$.pipe(
        map(s => !!s),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$: Observable<boolean> = progress(
        this.receiveWebhooks$.pipe(filter(v => v === 'new')),
        this.webhooksState$
    ).pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));

    hasMore$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.queryParams
            .pipe(
                take(1),
                pluck('limit'),
                filter(l => !!l)
            )
            .subscribe(limit => {
                this.webhooksLimit$.next(parseInt(limit, 10));
            });
        this.webhooksLimit$.subscribe(limit => {
            this.router.navigate([location.pathname], {
                queryParams: {
                    limit
                }
            });
        });

        this.receiveWebhooks$
            .pipe(
                switchMap(action => {
                    switch (action) {
                        case 'new':
                            return this.webhooksService.getWebhooks().pipe(
                                catchError(err => {
                                    console.error(err);
                                    this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                                    return of([]);
                                })
                            );
                        case 'more':
                            this.webhooksLimit$.next(this.webhooksLimit$.value + 20);
                            return of(this.cache);
                    }
                })
            )
            .subscribe(webhooks => {
                this.cache = webhooks;
                this.webhooksState$.next(webhooks);
                this.hasMore$.next(webhooks.length > this.webhooksLimit$.value);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next('new');
    }

    getMoreWebhooks() {
        this.receiveWebhooks$.next('more');
    }
}
