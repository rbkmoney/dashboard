import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, first, map, pluck, shareReplay, switchMap, take, tap } from 'rxjs/operators';
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

    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter(s => !!s),
        map(w => sortBy(w, i => !i.active)),
        switchMap(webhooks => combineLatest([this.webhooksOffset$, of(webhooks)])),
        map(([offset, webhooks]) => webhooks.slice(0, offset)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$: Observable<boolean> = progress(this.receiveWebhooks$, this.webhooks$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$: Observable<boolean> = combineLatest([this.webhooksState$, this.webhooksOffset$]).pipe(
        map(([webhooks, offset]) => webhooks?.length > offset),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.selectedIdx$.subscribe();
        this.isLoading$.subscribe();
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

    loadSelected(id: string) {
        return combineLatest([this.hasMore$, this.webhooks$]).pipe(
            map(([hasMore, webhooks]) => {
                const idx = webhooks.findIndex(p => p.id === id);
                return { idx, isContinueToFetch: idx === -1 && hasMore };
            }),
            tap(({ isContinueToFetch }) => {
                if (isContinueToFetch) {
                    this.getMoreWebhooks();
                }
            }),
            take(10),
            filter(({ isContinueToFetch }) => !isContinueToFetch),
            pluck('idx'),
            first(null, -1)
        );
    }

    select(idx: number) {
        this.webhooks$.pipe(pluck(idx, 'id')).subscribe(fragment => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }
}
