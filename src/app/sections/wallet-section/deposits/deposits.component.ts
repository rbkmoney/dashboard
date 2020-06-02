import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
import { DepositsService } from './deposits.service';

@Component({
    templateUrl: 'deposits.component.html',
    providers: [DepositsService],
    styleUrls: ['deposits.component.scss'],
})
export class DepositsComponent implements OnInit {
    deposits$ = this.depositsService.searchResult$;
    hasMore$ = this.depositsService.hasMore$;
    doAction$ = this.depositsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));

    constructor(private depositsService: DepositsService) {}

    fetchMore() {
        this.depositsService.fetchMore();
    }

    ngOnInit(): void {
        this.depositsService.search(null);
    }
}
