import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import moment, { Moment } from 'moment';
import { defer, ReplaySubject } from 'rxjs';
import { shareReplay, startWith } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { InvoiceStatus } from '@dsh/api-codegen/anapi/swagger-codegen';
import { Invoice, PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { DateRange } from '@dsh/components/filters/date-range-filter';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { ComponentChanges } from '@dsh/type-utils';

import { filterShopsByRealm } from '../../operators';
import { SearchFiltersParams } from './search-filters-params';

import RealmEnum = PaymentInstitution.RealmEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-invoices-search-filters',
    templateUrl: 'invoices-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesSearchFiltersComponent implements OnChanges {
    @Input() initParams: SearchFiltersParams;
    @Input() realm: RealmEnum;
    @Output() searchParamsChanges = new EventEmitter<SearchFiltersParams>();

    form = this.fb.group<{
        invoiceIDs: Invoice['id'][];
        shopIDs: Shop['id'][];
        invoiceStatus: InvoiceStatus.StatusEnum;
        dateRange: DateRange;
    }>({
        invoiceIDs: null,
        shopIDs: null,
        invoiceStatus: null,
        dateRange: null,
    });
    shops$ = defer(() => this.realm$).pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));
    defaultDateRange: DateRange = { start: moment().subtract(90, 'd'), end: moment().endOf('d') };
    maxDate: Moment = moment().endOf('d');

    private realm$ = new ReplaySubject<RealmEnum>(1);

    constructor(private fb: FormBuilder, private shopService: ApiShopsService) {}

    ngOnChanges({ realm, initParams }: ComponentChanges<InvoicesSearchFiltersComponent>): void {
        if (realm) this.realm$.next(realm.currentValue);
        if (initParams.firstChange) {
            const { fromTime, toTime, ...params } = initParams.currentValue || {};
            this.form.patchValue({
                ...params,
                dateRange: {
                    start: fromTime ? moment(fromTime) : moment().subtract(90, 'd'),
                    end: toTime ? moment(toTime) : moment().endOf('d'),
                },
            });
            this.form.valueChanges
                .pipe(startWith(this.form.value), untilDestroyed(this))
                .subscribe(({ dateRange, ...params }) => {
                    this.searchParamsChanges.next({
                        ...params,
                        fromTime: dateRange.start.utc().format(),
                        toTime: dateRange.end.utc().format(),
                    });
                });
        }
    }
}
