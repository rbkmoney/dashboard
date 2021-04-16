import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { PaymentSearchResult, RefundSearchResult } from '@dsh/api-codegen/capi';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { PaymentIds } from '../../../types/payment-ids';
import { CreateRefundDialogResponse, CreateRefundDialogResponseStatus, CreateRefundService } from './create-refund';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        FetchRefundsService,
        {
            provide: SEARCH_LIMIT,
            useValue: 3,
        },
    ],
})
export class RefundsComponent implements OnInit {
    @Input() invoiceID: string;
    @Input() paymentID: string;
    @Input() shopID: string;
    @Input() currency: string;
    @Input() maxRefundAmount: number;
    @Input() status: PaymentSearchResult.StatusEnum;

    @Output() fullyRefunded = new EventEmitter<PaymentIds>();

    refunds$: Observable<RefundSearchResult[]> = this.refundsService.searchResult$;
    isLoading$: Observable<boolean> = this.refundsService.isLoading$;
    hasMore$: Observable<boolean> = this.refundsService.hasMore$;

    constructor(private refundsService: FetchRefundsService, private createRefundService: CreateRefundService) {}

    get isRefundAvailable(): boolean {
        return this.status === PaymentSearchResult.StatusEnum.Captured;
    }

    ngOnInit(): void {
        this.updateRefunds();
    }

    createRefund(): void {
        const createRefundData = {
            invoiceID: this.invoiceID,
            paymentID: this.paymentID,
            shopID: this.shopID,
            currency: this.currency,
            maxRefundAmount: this.maxRefundAmount,
        };
        this.createRefundService
            .createRefund(createRefundData)
            .pipe(
                take(1),
                filter(({ status }: CreateRefundDialogResponse) => status === CreateRefundDialogResponseStatus.Success)
            )
            .subscribe(({ availableAmount }: CreateRefundDialogResponse) => {
                this.updateRefunds();
                if (availableAmount === 0) {
                    this.fullyRefunded.emit({
                        invoiceID: createRefundData.invoiceID,
                        paymentID: createRefundData.paymentID,
                    });
                }
            });
    }

    loadMoreRefunds(): void {
        this.refundsService.fetchMore();
    }

    private updateRefunds(): void {
        this.refundsService.search({ invoiceID: this.invoiceID, paymentID: this.paymentID });
    }
}
