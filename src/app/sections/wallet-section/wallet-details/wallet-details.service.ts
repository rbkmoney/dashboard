import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { progress } from '@rbkmoney/utils';
import { merge, zip } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { WalletService } from '@dsh/api/wallet';

import { filterError, filterPayload, replaceError, SHARE_REPLAY_CONF } from '../../../custom-operators';

@Injectable()
export class WalletDetailsService {
    private walletID$ = this.route.params.pipe(pluck('walletID'), shareReplay(SHARE_REPLAY_CONF));

    private walletOrError$ = this.walletID$.pipe(
        switchMap((walletID) => this.walletService.getWallet(walletID)),
        replaceError,
        shareReplay(SHARE_REPLAY_CONF)
    );

    private accountOrError$ = this.walletID$.pipe(
        switchMap((walletID) => this.walletService.getWalletAccount(walletID)),
        replaceError,
        shareReplay(SHARE_REPLAY_CONF)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    wallet$ = this.walletOrError$.pipe(filterPayload);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    walletAccount$ = this.accountOrError$.pipe(filterPayload);

    private walletError$ = this.walletOrError$.pipe(filterError);
    private accountError$ = this.accountOrError$.pipe(filterError);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    errors$ = merge(this.walletError$, this.accountError$);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    requests$ = zip(this.wallet$, this.walletAccount$);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.walletID$, this.requests$).pipe(shareReplay(SHARE_REPLAY_CONF));

    constructor(
        private route: ActivatedRoute,
        private walletService: WalletService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
