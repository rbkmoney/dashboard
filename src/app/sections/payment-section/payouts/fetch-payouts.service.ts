import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { Payout } from '@dsh/api-codegen/anapi';
import { PayoutSearchService } from '@dsh/api/search';

import { booleanDebounceTime } from '../../../custom-operators';
import { PartialFetcher } from '../../partial-fetcher';
import { mapToTimestamp } from '../operations/operators';
import { SearchParams } from './search-params';

@Injectable()
export class FetchPayoutsService extends PartialFetcher<Payout, SearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private payoutSearchService: PayoutSearchService, private route: ActivatedRoute) {
        super();
    }

    protected fetch({ fromTime, toTime, ...restParams }: SearchParams, continuationToken: string) {
        return this.route.params.pipe(
            pluck('realm'),
            take(1),
            switchMap((paymentInstitutionRealm) =>
                this.payoutSearchService.searchPayouts(fromTime, toTime, 10, {
                    ...restParams,
                    paymentInstitutionRealm,
                    continuationToken,
                })
            )
        );
    }
}
