import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import isNil from 'lodash-es/isNil';
import pick from 'lodash-es/pick';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/anapi/swagger-codegen';
import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { Daterange } from '@dsh/pipes/daterange';
import { ComponentChanges } from '@dsh/type-utils';

import { daterangeFromStr, strToDaterange } from '../../../../../shared/utils';
import { getDefaultDaterange } from './get-default-daterange';
import { SearchFiltersParams } from './search-filters-params';

import RealmEnum = PaymentInstitution.RealmEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-invoices-search-filters',
    templateUrl: 'invoices-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesSearchFiltersComponent implements OnChanges, OnInit {
    @Input() initParams: SearchFiltersParams;
    @Input() realm: RealmEnum;
    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    daterange: Daterange;

    selectedShops$: Observable<Shop[]>;

    form = this.fb.group<{ invoiceIDs: string[]; shopIDs: Shop['id'][] }>({ invoiceIDs: [], shopIDs: [] });

    private selectedShopIDs$ = new ReplaySubject<string[]>(1);
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        this.form.patchValue(pick(this.initParams, ['invoiceIDs', 'shopIDs']));
    }

    ngOnChanges({ initParams }: ComponentChanges<InvoicesSearchFiltersComponent>): void {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            this.initSearchParams(initParams.currentValue);
        }
    }

    daterangeSelectionChange(range: Daterange | null): void {
        const daterange = isNil(range) ? getDefaultDaterange() : range;
        if (isNil(range)) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeFromStr(daterange));
    }

    shopSelectionChange(shops: Shop[]): void {
        const shopIDs = shops.map((shop) => shop.id);
        this.selectedShopIDs$.next(shopIDs);
    }

    statusSelectionChange(invoiceStatus: Invoice.StatusEnum): void {
        this.searchParams$.next({ invoiceStatus });
    }

    private initSearchParams({ fromTime, toTime, shopIDs }: SearchFiltersParams): void {
        this.daterange = fromTime && toTime ? strToDaterange({ fromTime, toTime }) : getDefaultDaterange();
        this.daterangeSelectionChange(this.daterange);
        if (shopIDs) {
            this.selectedShopIDs$.next(shopIDs);
        }
    }
}
