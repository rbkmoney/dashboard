import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '@dsh/operators';
import { FetchDepositsService } from './services/fetch-deposits.service';

@Component({
    templateUrl: 'deposits.component.html',
    providers: [FetchDepositsService],
    styleUrls: ['deposits.component.scss'],
})
export class DepositsComponent implements OnInit {
    deposits$ = this.depositsService.searchResult$;
    hasMore$ = this.depositsService.hasMore$;
    doAction$ = this.depositsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));

    constructor(private depositsService: FetchDepositsService) {}

    fetchMore() {
        this.depositsService.fetchMore();
    }

    ngOnInit(): void {
        this.depositsService.search(null);
    }
}
