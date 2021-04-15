import { Component, Input, OnInit } from '@angular/core';
import { shareReplay, startWith } from 'rxjs/operators';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { booleanDebounceTime } from '@dsh/operators';

import { FetchDepositRevertsService } from './services/fetch-deposit-reverts.service';

@Component({
    selector: 'dsh-deposit-reverts',
    templateUrl: 'deposit-reverts.component.html',
    providers: [
        FetchDepositRevertsService,
        {
            provide: SEARCH_LIMIT,
            useValue: 3,
        },
    ],
})
export class DepositRevertsComponent implements OnInit {
    @Input() depositID: string;

    reverts$ = this.fetchDepositRevertsService.searchResult$;
    hasMore$ = this.fetchDepositRevertsService.hasMore$;
    isLoading$ = this.fetchDepositRevertsService.doAction$.pipe(booleanDebounceTime(), startWith(true), shareReplay(1));

    constructor(private fetchDepositRevertsService: FetchDepositRevertsService) {}

    ngOnInit(): void {
        this.fetchDepositRevertsService.search({
            depositID: this.depositID,
        });
    }

    fetchMore() {
        this.fetchDepositRevertsService.fetchMore();
    }
}
