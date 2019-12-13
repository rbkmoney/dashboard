import { Component, Inject } from '@angular/core';

import { ClaimsService } from './claims.service';
import { LAYOUT_GAP } from '../constants';
import { ClaimSearchFormValue } from './search-form';
import { SpinnerType } from '../../spinner';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    providers: [ClaimsService]
})
export class ClaimsComponent {
    tableData$ = this.claimsService.claimsTableData$;
    isLoading$ = this.claimsService.isLoading$;
    hasMore$ = this.claimsService.hasMore$;

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private claimsService: ClaimsService
    ) {}

    search(val: ClaimSearchFormValue) {
        this.claimsService.search(val);
    }

    fetchMore() {
        this.claimsService.fetchMore();
    }
}
