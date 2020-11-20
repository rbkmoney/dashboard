import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
import { DepositsService } from './deposits.service';

@Component({
    selector: 'dsh-deposits',
    templateUrl: 'deposits.component.html',
    styleUrls: ['./deposits.component.scss'],
    providers: [DepositsService],
})
export class DepositsComponent implements OnInit {
    deposits$ = this.depositsService.searchResult$;
    hasMore$ = this.depositsService.hasMore$;
    doAction$ = this.depositsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));
    error$ = this.depositsService.errors$;

    constructor(private depositsService: DepositsService) {}

    fetchMore() {
        this.depositsService.fetchMore();
    }

    ngOnInit(): void {
        this.depositsService.search(null);
    }
}
