import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { isEmpty, negate } from 'lodash-es';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { QueryParamsService } from '@dsh/app/shared/services/query-params/query-params.service';
import { DateRange } from '@dsh/components/filters/date-range-filter';

import { PaymentInstitutionRealmService } from '../../services/payment-institution-realm/payment-institution-realm.service';
import { Filters } from './payments-filters';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';
import { PaymentsExpandedIdManager } from './services/payments-expanded-id-manager/payments-expanded-id-manager.service';
import { PaymentSearchFormValue } from './types/payment-search-form-value';

type QueryParams = Omit<PaymentSearchFormValue, 'realm' | 'paymentMethod'>;

type Serializer<T> = {
    serialize: (v: T) => string;
    deserialize: (v: string) => T;
    recognize: (v: string, k: string) => boolean;
};

const dateRangeSerializer: Serializer<DateRange> = {
    serialize: (dateRange) => `dr${dateRange.start.utc().format()},${dateRange.end.utc().format()}`,
    deserialize: (str) => {
        const parts = str.slice(2).split(',');
        return { start: moment(parts[0]), end: moment(parts[1]) };
    },
    recognize: (v) => v[0] === 'dr',
};

@UntilDestroy()
@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [FetchPaymentsService, PaymentsExpandedIdManager, PaymentInstitutionRealmService, QueryParamsService],
})
export class PaymentsComponent {
    realm$ = this.paymentInstitutionRealmService.realm$;
    payments$: Observable<PaymentSearchResult[]> = this.paymentsService.paymentsList$;
    isLoading$: Observable<boolean> = this.paymentsService.isLoading$;
    hasMoreElements$: Observable<boolean> = this.paymentsService.hasMore$;
    lastUpdated$: Observable<string> = this.paymentsService.lastUpdated$;
    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;
    initParams$ = this.qp.params$.pipe(
        map(({ fromTime, toTime, first6, last4, ...params }) => ({
            binPan: { bin: first6, pan: last4 },
            ...(fromTime && toTime ? { dateRange: { start: moment(fromTime), end: moment(toTime) } } : {}),
            ...params,
        }))
    );

    constructor(
        private paymentsService: FetchPaymentsService,
        private route: ActivatedRoute,
        private expandedIdManager: PaymentsExpandedIdManager,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<QueryParams>
    ) {}

    refreshList(): void {
        this.paymentsService.refresh();
    }

    requestNextPage(): void {
        this.paymentsService.fetchMore();
    }

    filtersChanged({ dateRange, binPan, ...otherFilters }: Filters): void {
        const params: QueryParams = pickBy(
            {
                fromTime: dateRange.start.utc().format(),
                toTime: dateRange.end.utc().format(),
                ...(binPan ? { first6: binPan.bin, last4: binPan.pan } : {}),
                ...otherFilters,
            },
            identity
        ) as QueryParams;
        this.paymentsService.search({
            ...params,
            ...(binPan ? { paymentMethod: 'bankCard' } : {}),
            realm: this.paymentInstitutionRealmService.realm,
        });
        void this.qp.set(params, { filter: negate(isEmpty) });
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
