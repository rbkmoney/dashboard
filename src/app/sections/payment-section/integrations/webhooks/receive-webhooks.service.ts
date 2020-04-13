import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import chunk from 'lodash.chunk';
import sortBy from 'lodash.sortby';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksLimit$: BehaviorSubject<number> = new BehaviorSubject(10);
    private webhooksState$ = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<'new' | 'more'> = new Subject();

    private webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        booleanDebounceTime(),
        filter(s => !!s),
        map(w => sortBy(w, i => !i.active)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhooksChunk$: Observable<Webhook[]> = this.webhooks$.pipe(
        map(w => chunk(w, this.webhooksLimit$.getValue())[0]),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhooksReceived$: Observable<boolean> = this.webhooksChunk$.pipe(
        map(s => !!s),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$: Observable<boolean> = progress(this.receiveWebhooks$, this.webhooksState$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.queryParams.pipe(take(1)).subscribe(v => {
            if (v.limit) {
                this.webhooksLimit$.next(v.limit);
            }
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
                            this.webhooksLimit$.next(this.webhooksLimit$.getValue() + 10);
                            return this.webhooks$;
                    }
                })
            )
            .subscribe(webhooks => {
                console.log(webhooks);
                this.hasMore$.next(webhooks.length > this.webhooksLimit$.getValue());
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next('new');
    }

    getMoreWebhooks() {
        this.receiveWebhooks$.next('more');
    }
}
