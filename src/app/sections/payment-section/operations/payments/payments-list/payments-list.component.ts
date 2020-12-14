import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { PaymentInstitutionRealm } from '@dsh/api/model';

import { ComponentChange, ComponentChanges } from '../../../../../../type-utils';
import { Payment } from '../types/payment';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';

@UntilDestroy()
@Component({
    selector: 'dsh-payments-list',
    templateUrl: './payments-list.component.html',
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

        // TODO: change init search logic
        this.fetchPayments.search({
            date: {
                begin: moment().startOf('month'),
                end: moment().endOf('month'),
            },
        });
    }

    ngOnChanges(changes: ComponentChanges<PaymentsListComponent>): void {
        if (!isNil(changes.realm)) {
            this.initRealm(changes.realm);
        }
    }

    refreshList(): void {
        this.fetchPayments.refresh();
    }

    requestNextPage(): void {
        this.fetchPayments.fetchMore();
    }

    private initRealm(change: ComponentChange<PaymentsListComponent, 'realm'>): void {
        if (!isNil(change.currentValue)) {
            this.fetchPayments.initRealm(change.currentValue);
        }
    }
}