import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
import { WithdrawalsService } from './withdrawals.service';

@Component({
    selector: 'dsh-withdrawals',
    templateUrl: 'withdrawals.component.html',
    styleUrls: ['./withdrawals.component.scss'],
    providers: [WithdrawalsService],
})
export class WithdrawalsComponent implements OnInit {
    withdrawals$ = this.withdrawalsService.searchResult$;
    hasMore$ = this.withdrawalsService.hasMore$;
    doAction$ = this.withdrawalsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));
    error$ = this.withdrawalsService.errors$;

    constructor(private withdrawalsService: WithdrawalsService) {}

    fetchMore() {
        this.withdrawalsService.fetchMore();
    }

    ngOnInit(): void {
        this.withdrawalsService.search(null);
    }
}
