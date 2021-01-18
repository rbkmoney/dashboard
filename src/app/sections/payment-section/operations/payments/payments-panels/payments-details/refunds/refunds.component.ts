import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { PaymentSearchResult, RefundSearchResult } from '@dsh/api-codegen/capi';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

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
            useValue: 1,
        }
    ]
})
export class RefundsComponent implements OnInit {
    @Input() invoiceID: string;
    @Input() paymentID: string;
    @Input() shopID: string;
    @Input() currency: string;
    @Input() maxRefundAmount: number;
    @Input() status: PaymentSearchResult.StatusEnum;

    @Output() statusChanged = new EventEmitter<void>();

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
        this.createRefundService
            .createRefund({
                invoiceID: this.invoiceID,
                paymentID: this.paymentID,
                shopID: this.shopID,
                currency: this.currency,
                maxRefundAmount: this.maxRefundAmount,
            })
            .pipe(
                take(1),
                filter(({ status }: CreateRefundDialogResponse) => status === CreateRefundDialogResponseStatus.SUCCESS)
            )
            .subscribe(({ availableAmount }: CreateRefundDialogResponse) => {
                this.updateRefunds();
                if (availableAmount === 0) {
                    this.statusChanged.emit();
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
