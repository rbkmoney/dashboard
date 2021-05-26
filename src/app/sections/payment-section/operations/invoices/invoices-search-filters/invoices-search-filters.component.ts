import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import isNil from 'lodash-es/isNil';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay, switchMap, take } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/anapi/swagger-codegen';
import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { Daterange } from '@dsh/pipes/daterange';
import { ComponentChanges } from '@dsh/type-utils';

import { daterangeFromStr, strToDaterange } from '../../../../../shared/utils';
import { filterShopsByRealm } from '../../operators';
import { getDefaultDaterange } from './get-default-daterange';
import { SearchFiltersParams } from './search-filters-params';

@UntilDestroy()
@Component({
    selector: 'dsh-invoices-search-filters',
    templateUrl: 'invoices-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesSearchFiltersComponent implements OnChanges, OnInit {
    @Input() initParams: SearchFiltersParams;

    @Input() set realm(realm: PaymentInstitutionRealm) {
        this.realm$.next(realm);
    }

    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    daterange: Daterange;

    shops$: Observable<Shop[]>;

    selectedShops$: Observable<Shop[]>;

    form = this.fb.group<{ invoiceIDs: string[] }>({ invoiceIDs: [] });

    private realm$ = new ReplaySubject<PaymentInstitutionRealm>();
    private selectedShopIDs$ = new ReplaySubject<string[]>(1);
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    constructor(private shopService: ApiShopsService, private fb: FormBuilder) {
        this.shops$ = this.realm$.pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));
        this.selectedShops$ = this.selectedShopIDs$.pipe(
            switchMap((ids) =>
                this.shops$.pipe(
                    take(1),
                    map((shops) => shops.filter((shop) => ids.includes(shop.id)))
                )
            ),
            shareReplay(1)
        );
    }

    ngOnInit(): void {
        this.selectedShopIDs$
            .pipe(
                map((ids) => (ids.length ? ids : null)),
                untilDestroyed(this)
            )
            .subscribe((shopIDs) => this.searchParams$.next({ shopIDs }));
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        if (this.initParams.invoiceIDs) {
            this.form.setValue({ invoiceIDs: this.initParams.invoiceIDs });
        }
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
