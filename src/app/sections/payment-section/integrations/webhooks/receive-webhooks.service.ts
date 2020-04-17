import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksLimit$: BehaviorSubject<number> = new BehaviorSubject(10);
    private webhooksState$: BehaviorSubject<Webhook[]> = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<void> = new Subject();
    private getMoreWebhooks$: Subject<void> = new Subject();

    webhhoks$: Observable<Webhook[]> = combineLatest([
        this.webhooksLimit$,
        this.webhooksState$.pipe(
            filter(s => !!s),
            map(w => sortBy(w, i => !i.active))
        )
    ]).pipe(
        map(([limit, webhooks]) => {
            this.hasMore$.next(webhooks.length > limit);
            return webhooks.slice(0, limit);
        })
    );

    webhooksReceived$: Observable<boolean> = this.webhhoks$.pipe(
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
                this.hasMore$.next(webhooks.length > this.webhooksLimit$.value);
            });

        this.getMoreWebhooks$.pipe(switchMap(() => this.webhooksLimit$.pipe(take(1)))).subscribe(limit => {
            this.webhooksLimit$.next(limit + 10);
        });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }

    getMoreWebhooks() {
        this.getMoreWebhooks$.next();
    }
}
