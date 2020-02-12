import { Component, ChangeDetectionStrategy } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { PayoutsService } from './payouts.service';
import { mapToTimestamp } from '../operations/operators';
import { booleanDebounceTime } from '../../../custom-operators';

@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    styleUrls: ['payouts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PayoutsService]
})
export class PayoutsComponent {
    payouts$ = this.payoutsService.searchResult$;
    isLoading$ = this.payoutsService.doAction$.pipe(
        booleanDebounceTime(),
        shareReplay(1)
    );
    hasMore$ = this.payoutsService.hasMore$;
    lastUpdated$ = this.payoutsService.searchResult$.pipe(
        mapToTimestamp,
        shareReplay(1)
    );

    constructor(private payoutsService: PayoutsService) {}

    fetchMore() {
        this.payoutsService.fetchMore();
    }

    refresh() {
        this.payoutsService.refresh();
    }
}
