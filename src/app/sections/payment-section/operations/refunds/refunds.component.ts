import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { shareReplay } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { RefundsService } from './refunds.service';
import { RefundsSearchFormValue } from './search-form';

@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    providers: [RefundsService]
})
export class RefundsComponent {
    tableData$ = this.refundsService.refundsTableData$;
    hasMoreRefunds$ = this.refundsService.hasMore$;
    lastUpdated$ = this.refundsService.lastUpdated$;
    doAction$ = this.refundsService.doAction$;
    isLoading$ = this.doAction$.pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        private refundsService: RefundsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.refundsService.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    search(val: RefundsSearchFormValue) {
        this.refundsService.search(val);
    }

    fetchMore() {
        this.refundsService.fetchMore();
    }

    refresh() {
        this.refundsService.refresh();
    }
}
