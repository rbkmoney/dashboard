import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { defer, ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { InvoiceStatus } from '@dsh/api-codegen/anapi/swagger-codegen';
import { Invoice, PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { createDateRangeWithPreset, DateRange, Preset } from '@dsh/components/filters/date-range-filter';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { filterShopsByRealm } from '../../operators';

import RealmEnum = PaymentInstitution.RealmEnum;

export type Filters = {
    invoiceIDs: Invoice['id'][];
    shopIDs: Shop['id'][];
    invoiceStatus: InvoiceStatus.StatusEnum;
    dateRange: DateRange;
};

@UntilDestroy()
@Component({
    selector: 'dsh-invoices-search-filters',
    templateUrl: 'invoices-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesSearchFiltersComponent implements OnChanges, OnInit {
    @Input() initParams: Filters;
    @Input() realm: RealmEnum;
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({
        invoiceIDs: null,
        shopIDs: null,
        invoiceStatus: null,
        dateRange: this.defaultDateRange,
    });
    shops$ = defer(() => this.realm$).pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));

    private realm$ = new ReplaySubject<RealmEnum>(1);

    constructor(private fb: FormBuilder, private shopService: ApiShopsService) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.searchParamsChanges.next(filters));
    }

    ngOnChanges({ realm, initParams }: ComponentChanges<InvoicesSearchFiltersComponent>): void {
        if (realm) this.realm$.next(realm.currentValue);
        if (initParams?.firstChange && initParams.currentValue) this.form.patchValue(initParams.currentValue);
    }
}
