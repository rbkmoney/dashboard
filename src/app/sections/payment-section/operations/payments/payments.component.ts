import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

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
    localeBaseDir = 'sections.operations.payments';
    lastUpdated: Date;
    $lastContinuationToken: Subject<string>;

    constructor(private paymentService: PaymentsService) {
        this.$lastContinuationToken = paymentService.$lastContinuationToken;
    }

    search(searchFormValue: PaymentSearchFormValue) {
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
        this.search(undefined);
    }

    private updateLastUpdated() {
        this.lastUpdated = new Date();
    }
}
