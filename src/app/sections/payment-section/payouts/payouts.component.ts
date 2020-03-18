import { ChangeDetectionStrategy, Component } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../custom-operators';
import { mapToTimestamp } from '../operations/operators';
import { PayoutsService } from './payouts.service';

@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    styleUrls: ['payouts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PayoutsService]
})
export class PayoutsComponent {
    payouts$ = this.payoutsService.searchResult$;
    isLoading$ = this.payoutsService.doAction$;
    isInit$ = this.payoutsService.doSearchAction$;
    hasMore$ = this.payoutsService.hasMore$;
    lastUpdated$ = this.payoutsService.searchResult$.pipe(
        mapToTimestamp,
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private payoutsService: PayoutsService) {}

    fetchMore() {
        this.payoutsService.fetchMore();
    }

    refresh() {
        this.payoutsService.refresh();
    }
}
