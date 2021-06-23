import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import isNil from 'lodash-es/isNil';
import pick from 'lodash-es/pick';
import { defer, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan, shareReplay } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/anapi/swagger-codegen';
import { PaymentInstitution, RefundStatus } from '@dsh/api-codegen/capi';
import { ApiShopsService } from '@dsh/api/shop';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { Daterange } from '@dsh/pipes/daterange';

import { daterangeFromStr, strToDaterange } from '../../../../../shared/utils';
import { filterShopsByRealm } from '../../operators';
import { SearchFiltersParams } from '../types/search-filters-params';
import { getDefaultDaterange } from './get-default-daterange';

import RealmEnum = PaymentInstitution.RealmEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-refunds-search-filters',
    templateUrl: 'refunds-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsSearchFiltersComponent implements OnInit {
    @Input() initParams: SearchFiltersParams;
    @Input() set realm(realm: RealmEnum) {
        this.realm$.next(realm);
    }
    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    form = this.fb.group<{ invoiceIDs: string[]; shopIDs: Shop['id'][]; refundStatus: RefundStatus.StatusEnum }>({
        invoiceIDs: null,
        shopIDs: null,
        refundStatus: null,
    });
    daterange: Daterange;
    shops$ = defer(() => this.realm$).pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));

    private realm$ = new ReplaySubject<RealmEnum>();
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    constructor(private shopService: ApiShopsService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        this.form.patchValue(pick(this.initParams, ['invoiceIDs', 'shopIDs', 'refundStatus']));

        const { fromTime, toTime } = this.initParams;
        this.daterange = !(fromTime || toTime) ? getDefaultDaterange() : strToDaterange(this.initParams);
        this.daterangeSelectionChange(this.daterange);
    }

    daterangeSelectionChange(range: Daterange | null): void {
        const daterange = isNil(range) ? getDefaultDaterange() : range;
        if (isNil(range)) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeFromStr(daterange));
    }
}
