import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import isEqual from 'lodash.isequal';
import isNil from 'lodash.isnil';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay, switchMap, take } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/anapi/swagger-codegen';
import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';
import { Daterange } from '@dsh/pipes/daterange';

import { ComponentChanges } from '../../../../../../type-utils';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { daterangeFromStr, strToDaterange } from '../../../../../shared/utils';
import { filterShopsByRealm } from '../../operators';
import { getDefaultDaterange } from './get-default-daterange';
import { SearchFiltersParams } from './search-filters-params';

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

    private realm$ = new ReplaySubject<PaymentInstitutionRealm>();
    private selectedShopIDs$ = new ReplaySubject<string[]>(1);
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    constructor(private shopService: ApiShopsService) {
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

    ngOnInit() {
        this.selectedShopIDs$
            .pipe(map((ids) => (ids.length ? ids : null)))
            .subscribe((shopIDs) => this.searchParams$.next({ shopIDs }));
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
    }

    ngOnChanges({ initParams }: ComponentChanges<InvoicesSearchFiltersComponent>) {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            this.initSearchParams(initParams.currentValue);
        }
    }

    daterangeSelectionChange(range: Daterange | null) {
        const daterange = isNil(range) ? getDefaultDaterange() : range;
        if (isNil(range)) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeFromStr(daterange));
    }

    shopSelectionChange(shops: Shop[]) {
        const shopIDs = shops.map((shop) => shop.id);
        this.selectedShopIDs$.next(shopIDs);
    }

    invoiceSelectionChange(invoiceIDs: string[]) {
        this.searchParams$.next({ invoiceIDs: invoiceIDs?.length ? invoiceIDs : null });
    }

    statusSelectionChange(invoiceStatus: Invoice.StatusEnum) {
        this.searchParams$.next({ invoiceStatus });
    }

    private initSearchParams({ fromTime, toTime, shopIDs }: SearchFiltersParams) {
        this.daterange = fromTime && toTime ? strToDaterange({ fromTime, toTime }) : getDefaultDaterange();
        this.daterangeSelectionChange(this.daterange);
        if (shopIDs) {
            this.selectedShopIDs$.next(shopIDs);
        }
    }
}
