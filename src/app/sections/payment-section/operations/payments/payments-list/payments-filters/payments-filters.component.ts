import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash.isempty';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { Daterange } from '@dsh/pipes/daterange';

import { ComponentChange, ComponentChanges } from '../../../../../../../type-utils';
import { AdditionalFiltersService } from './additional-filters';
import { PaymentsFiltersService } from './services/payments-filters/payments-filters.service';
import { ShopsSelectionManagerService } from './services/shops-selection-manager/shops-selection-manager.service';
import { PaymentsAdditionalFilters } from './types/payments-additional-filters';
import { PaymentsFiltersData } from './types/payments-filters-data';

@UntilDestroy()
@Component({
    selector: 'dsh-payments-filters',
    templateUrl: 'payments-filters.component.html',
})
export class PaymentsFiltersComponent implements OnInit, OnChanges {
    @Input() realm: PaymentInstitutionRealm;

    @Output() filtersChanged = new EventEmitter<PaymentsFiltersData>();

    filtersData$: Observable<PaymentsFiltersData> = this.filtersHandler.filtersData$;

    isAdditionalFilterApplied: boolean;

    shops$: Observable<Shop[]> = this.shopService.shops$;
    selectedShops$: Observable<Shop[]> = this.shopService.selectedShops$;

    protected changes$ = new ReplaySubject<ComponentChanges<PaymentsFiltersComponent>>(1);

    constructor(
        private shopService: ShopsSelectionManagerService,
        private filtersHandler: PaymentsFiltersService,
        private additionalFilters: AdditionalFiltersService
    ) {}

    ngOnInit(): void {
        const realm$ = this.changes$.pipe(
            map((changes) => changes.realm),
            filter(Boolean),
            map((change: ComponentChange<PaymentsFiltersComponent, 'realm'>) => change.currentValue),
            filter(Boolean)
        );

        realm$.pipe(untilDestroyed(this)).subscribe((realm: PaymentInstitutionRealm) => {
            this.shopService.setRealm(realm);
        });

        this.filtersData$.pipe(untilDestroyed(this)).subscribe((filtersData: PaymentsFiltersData) => {
            this.filtersChanged.emit(filtersData);
            const { shopIDs = [] } = filtersData;
            this.shopService.setSelectedIds(shopIDs);
        });
    }

    ngOnChanges(changes: ComponentChanges<PaymentsFiltersComponent>): void {
        this.changes$.next(changes);
    }

    openFiltersDialog() {
        this.filtersData$
            .pipe(
                take(1),
                map((filtersData: PaymentsFiltersData) => filtersData.additional),
                switchMap((filters: PaymentsAdditionalFilters) => {
                    return this.additionalFilters.openFiltersDialog(filters);
                }),
                untilDestroyed(this)
            )
            .subscribe((filters: PaymentsAdditionalFilters) => {
                this.isAdditionalFilterApplied = !isEmpty(filters);
            });
    }

    dateRangeChange(dateRange: Daterange): void {
        this.updateFilters({ daterange: dateRange });
    }

    invoiceSelectionChange(invoiceIds: string[]): void {
        this.updateFilters({ invoiceIDs: invoiceIds });
    }

    shopSelectionChange(selectedShops: Shop[]): void {
        this.updateFilters({
            shopIDs: selectedShops.map(({ id }: Shop) => id),
        });
    }

    private updateFilters(change: Partial<PaymentsFiltersData>): void {
        this.filtersHandler.changeFilters({
            ...change,
        });
    }
}
