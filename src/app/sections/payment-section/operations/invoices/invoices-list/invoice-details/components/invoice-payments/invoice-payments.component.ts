import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Payment } from '@dsh/api-codegen/capi';
import { FakePaginator } from '@dsh/app/shared/services';

@Component({
    selector: 'dsh-invoice-payments',
    templateUrl: 'invoice-payments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FakePaginator],
})
export class InvoicePaymentsComponent implements OnInit {
    @Input() payments: Payment[];

    payments$ = this.paginationService.values$;
    hasMore$ = this.paginationService.hasMore$;

    constructor(private paginationService: FakePaginator<Payment>) {}

    ngOnInit() {
        this.paginationService.init(this.payments);
    }

    showMore() {
        this.paginationService.showMore();
    }
}
