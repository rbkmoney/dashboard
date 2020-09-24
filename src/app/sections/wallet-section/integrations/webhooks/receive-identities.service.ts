import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { IdentityService } from '../../../../api/identity';
import { WalletWebhooksService } from '../../../../api/wallet-webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveIdentitiesService {
    private receiveIdentities$ = new Subject<void>();

    identities$ = this.identityService.identities$;

    isLoading$ = progress(this.receiveIdentities$, this.identities$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private webhooksService: WalletWebhooksService,
        private identityService: IdentityService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        // this.receiveWebhooks$
        //     .pipe(
        //         switchMap(() =>
        //             this.webhooksService.getWebhooks().pipe(
        //                 catchError((err) => {
        //                     console.error(err);
        //                     this.snackBar.open(this.transloco.translate('httpError'), 'OK');
        //                     return of([]);
        //                 })
        //             )
        //         )
        //     )
        //     .subscribe((webhooks) => {
        //         this.webhooksState$.next(webhooks);
        //     });
    }

    receiveWebhooks() {
        this.receiveIdentities$.next();
    }
}
