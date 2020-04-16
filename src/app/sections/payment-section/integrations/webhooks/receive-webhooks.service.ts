import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, first, map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksState$ = new BehaviorSubject(null);
    private receiveWebhooks$ = new Subject();

    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter(s => !!s),
        map(w => sortBy(w, i => !i.active)),
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

    selectedIdx$ = this.route.fragment.pipe(
        first(),
        switchMap(fragment => (fragment ? this.loadSelected(fragment) : of(-1))),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private transloco: TranslocoService
    ) {
        this.selectedIdx$.subscribe();
        this.receiveWebhooks$
            .pipe(
                switchMap(_ =>
                    this.webhooksService.getWebhooks().pipe(
                        catchError(err => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            return of([]);
                        })
                    )
                )
            )
            .subscribe(webhooks => this.webhooksState$.next(webhooks));
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }

    select(idx: number) {
        this.webhooks$.pipe(pluck(idx, 'id')).subscribe(fragment => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }

    loadSelected(id: string) {
        return this.webhooks$.pipe(take(10), pluck('idx'), first(null, -1));
    }
}
