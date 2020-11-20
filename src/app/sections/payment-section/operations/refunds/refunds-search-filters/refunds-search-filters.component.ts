import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import isEqual from 'lodash.isequal';
import isNil from 'lodash.isnil';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay, switchMap, take } from 'rxjs/operators';

import { Daterange } from '@dsh/pipes/daterange';

import { RefundSearchResult } from '../../../../../api-codegen/anapi/swagger-codegen';
import { Shop } from '../../../../../api-codegen/capi/swagger-codegen';
import { ApiShopsService } from '../../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { filterShopsByRealm } from '../../operators';
import { daterangeToSearchFilterParams } from './daterange-to-search-filter-params';
import { getDefaultDaterange } from './get-default-daterange';
import { searchFilterParamsToDaterange } from './search-filter-params-to-daterange';
import { SearchFiltersParams } from './search-filters-params';

@Component({
    selector: 'dsh-refunds-search-filters',
    templateUrl: 'refunds-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsSearchFiltersComponent implements OnChanges, OnInit {
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    @Input() initParams: SearchFiltersParams;
    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    @Input() set realm(realm: string) {
        this.realm$.next(realm);
    }

    daterange: Daterange;

    private realm$ = new ReplaySubject();

    shops$: Observable<Shop[]> = this.realm$.pipe(
        filterShopsByRealm(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private selectedShopIDs$ = new ReplaySubject<string[]>(1);

    selectedShops$ = this.selectedShopIDs$.pipe(
        switchMap((ids) =>
            this.shops$.pipe(
                take(1),
                map((shops) => shops.filter((shop) => ids.includes(shop.id)))
            )
        ),
        shareReplay(1)
    );

    constructor(private shopService: ApiShopsService) {}

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

    ngOnChanges({ initParams }: SimpleChanges) {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            const v = initParams.currentValue;
            this.daterange = !(v.fromTime || v.toTime) ? getDefaultDaterange() : searchFilterParamsToDaterange(v);
            this.daterangeSelectionChange(this.daterange);
            if (v.shopIDs) {
                this.selectedShopIDs$.next(v.shopIDs);
            }
        }
    }

    daterangeSelectionChange(v: Daterange | null) {
        const daterange = isNil(v === null) ? getDefaultDaterange() : v;
        if (isNil(v === null)) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeToSearchFilterParams(daterange));
    }

    shopSelectionChange(shops: Shop[]) {
        const shopIDs = shops.map((shop) => shop.id);
        this.selectedShopIDs$.next(shopIDs);
    }

    invoiceSelectionChange(invoiceIDs: string[]) {
        this.searchParams$.next({ invoiceIDs: invoiceIDs?.length ? invoiceIDs : null });
    }

    statusSelectionChange(refundStatus: RefundSearchResult.StatusEnum) {
        this.searchParams$.next({ refundStatus });
    }
}
