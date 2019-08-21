import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';
import { PaymentsService } from './payments.service';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss']
})
export class PaymentsComponent {
    displayedColumns: string[] = ['amount', 'status', 'statusChanged', 'invoice', 'attributes', 'actions'];
    dataSource: MatTableDataSource<PaymentSearchResult> = new MatTableDataSource(null);
    localeBaseDir = 'sections.operations.payments.table';
    lastUpdated: Moment;
    lastContinuationToken$: Subject<string>;

    constructor(private paymentService: PaymentsService) {
        this.lastContinuationToken$ = paymentService.lastContinuationToken$;
    }

    search(searchFormValue?: PaymentSearchFormValue) {
        this.paymentService.getPayments(searchFormValue).subscribe(r => {
            this.dataSource.data = r;
            this.updateLastUpdated();
        });
    }

    showMore() {
        this.paymentService.getPayments().subscribe(r => {
            this.dataSource.data = this.dataSource.data.concat(r);
            this.updateLastUpdated();
        });
    }

    refresh() {
        this.search();
    }

    private updateLastUpdated() {
        this.lastUpdated = moment();
    }
}
