import { ChangeDetectionStrategy, Component } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
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
    doAction$ = this.payoutsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));
    isInit$ = this.payoutsService.isInit$;
    hasMore$ = this.payoutsService.hasMore$;
    lastUpdated$ = this.payoutsService.searchResult$.pipe(mapToTimestamp, shareReplay(SHARE_REPLAY_CONF));

    constructor(private payoutsService: PayoutsService) {}

    fetchMore() {
        this.payoutsService.fetchMore();
    }

    refresh() {
        this.payoutsService.refresh();
    }
}
