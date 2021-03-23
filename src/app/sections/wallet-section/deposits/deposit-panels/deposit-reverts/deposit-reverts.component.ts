import { Component, Input, OnInit } from '@angular/core';

import { Deposit } from '@dsh/api-codegen/wallet-api';

import { FetchDepositRevertsService } from './services/fetch-deposit-reverts.service';

@Component({
    selector: 'dsh-deposit-reverts',
    templateUrl: 'deposit-reverts.component.html',
    providers: [FetchDepositRevertsService],
})
export class DepositRevertsComponent implements OnInit {
    @Input() deposit: Deposit;

    reverts$ = this.fetchDepositRevertsService.searchResult$;
    hasMore$ = this.fetchDepositRevertsService.hasMore$;
    isLoading$ = this.fetchDepositRevertsService.isLoading$;

    constructor(private fetchDepositRevertsService: FetchDepositRevertsService) {}

    ngOnInit(): void {
        this.fetchDepositRevertsService.search({
            depositID: this.deposit.id,
        });
    }

    fetchMore() {
        this.fetchDepositRevertsService.fetchMore();
    }
}
