import { Component } from '@angular/core';

import { RefundsService } from './refunds.service';
import { RefundsSearchFormValue } from './search-form';
import { SpinnerType } from '../../../../spinner';

@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    providers: [RefundsService]
})
export class RefundsComponent {
    tableData$ = this.refundsService.refundsTableData$;
    hasMoreRefunds$ = this.refundsService.hasMore$;
    lastUpdated$ = this.refundsService.lastUpdated$;
    isLoading$ = this.refundsService.isLoading$;

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(private refundsService: RefundsService) {}

    search(val: RefundsSearchFormValue) {
        this.refundsService.search(val);
    }

    fetchMore() {
        this.refundsService.fetchMore();
    }

    refresh() {
        this.refundsService.refresh();
    }
}
