import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { filter, shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
import { mapToTimestamp } from '../operations/operators';
import { CreatePayoutDialogComponent } from './create-payout-dialog';
import { PayoutsService } from './payouts.service';

@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    styleUrls: ['payouts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PayoutsService],
})
export class PayoutsComponent {
    payouts$ = this.payoutsService.searchResult$;
    doAction$ = this.payoutsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));
    isInit$ = this.payoutsService.isInit$;
    hasMore$ = this.payoutsService.hasMore$;
    lastUpdated$ = this.payoutsService.searchResult$.pipe(mapToTimestamp, shareReplay(SHARE_REPLAY_CONF));

    constructor(
        private payoutsService: PayoutsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    createPayout() {
        return this.dialog
            .open(CreatePayoutDialogComponent, {
                width: '560px',
                disableClose: true,
                data: {
                    shopsInfo$: this.payoutsService.shopsInfo$,
                },
            })
            .afterClosed()
            .pipe(filter((r) => r === 'create'))
            .subscribe(() => {
                this.snackBar.open(
                    this.transloco.translate('create.success', null, 'reports|scoped'),
                    this.transloco.translate('ok')
                );
                this.refresh();
            });
    }

    fetchMore() {
        this.payoutsService.fetchMore();
    }

    refresh() {
        this.payoutsService.refresh();
    }
}
