import { Component, Input, OnInit } from '@angular/core';

import { FetchDepositRevertsService } from './services/fetch-deposit-reverts.service';

@Component({
    selector: 'dsh-deposit-reverts',
    templateUrl: 'deposit-reverts.component.html',
})
export class DepositRevertsComponent implements OnInit {
    @Input() depositID: string;

    reverts$ = this.fetchDepositRevertsService.searchResult$;
    hasMore$ = this.fetchDepositRevertsService.hasMore$;
    isLoading$ = this.fetchDepositRevertsService.isLoading$;

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
