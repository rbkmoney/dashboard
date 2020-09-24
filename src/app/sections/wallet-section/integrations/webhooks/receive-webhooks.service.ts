import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { Webhook } from '../../../../api-codegen/wallet-api/swagger-codegen';
import { WalletWebhooksService } from '../../../../api/wallet-webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { ReceiveIdentitiesService } from './receive-identities.service';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksState$: BehaviorSubject<Webhook[]> = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<void> = new Subject();

    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter((s) => !!s),
        map((w) => sortBy(w, (i) => !i.active)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$: Observable<boolean> = progress(this.receiveWebhooks$, this.webhooks$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private walletWebhooksService: WalletWebhooksService,
        private receiveIdentitiesService: ReceiveIdentitiesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        // this.isLoading$.subscribe();

        // this.identityService.listIdentities().subscribe(i => console.log('IDENTITITES', i))

        this.receiveWebhooks$
            .pipe(
                switchMap(() => this.receiveIdentitiesService.identities$),
                map((identities) => identities.map((identity) => identity.id)),
                switchMap((ids) =>
                    forkJoin(ids.map((id) => this.walletWebhooksService.getWebhooks(id))).pipe(
                        catchError((err) => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            return of([]);
                        })
                    )
                ),
                map((webhooks) => webhooks.flat())
            )
            .subscribe((webhooks) => {
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }
}
