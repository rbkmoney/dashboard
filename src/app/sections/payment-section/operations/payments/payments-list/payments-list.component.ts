import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';

import { PaymentInstitutionRealm } from '@dsh/api/model';

import { ComponentChange, ComponentChanges } from '../../../../../../type-utils';
import { Payment } from '../types/payment';
import { PaymentsFiltersData } from './payments-filters/types/payments-filters-data';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';

// TODO: move payments list in payments if payments has no logic except list
@UntilDestroy()
@Component({
    selector: 'dsh-payments-list',
    templateUrl: 'payments-list.component.html',
})
export class PaymentsListComponent implements OnInit, OnChanges {
    @Input() realm: PaymentInstitutionRealm;

    payments$: Observable<Payment[]> = this.fetchPayments.paymentsList$;
    isLoading$: Observable<boolean> = this.fetchPayments.isLoading$;
    hasMoreElements$: Observable<boolean> = this.fetchPayments.hasMore$;
    lastUpdated$: Observable<string> = this.fetchPayments.lastUpdated$;

    constructor(
        private fetchPayments: FetchPaymentsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit(): void {
        this.fetchPayments.errors$.pipe(untilDestroyed(this)).subscribe(() => {
            this.snackBar.open(this.transloco.translate('commonError'), 'OK');
        });
    }

    ngOnChanges(changes: ComponentChanges<PaymentsListComponent>): void {
        if (!isNil(changes.realm)) {
            this.updateRealm(changes.realm);
        }
    }

    refreshList(): void {
        this.fetchPayments.refresh();
    }

    requestNextPage(): void {
        this.fetchPayments.fetchMore();
    }

    filtersChanged(filtersData: PaymentsFiltersData): void {
        this.requestList(filtersData);
    }

    private updateRealm(change: ComponentChange<PaymentsListComponent, 'realm'>): void {
        if (!isNil(change.currentValue)) {
            this.fetchPayments.initRealm(change.currentValue);
        }
    }

    private requestList({ daterange, shopIDs, invoiceIDs }: PaymentsFiltersData): void {
        this.fetchPayments.search({
            date: {
                begin: daterange.begin,
                end: daterange.end,
            },
            invoiceIDs,
            shopIDs,
        });
    }
}
