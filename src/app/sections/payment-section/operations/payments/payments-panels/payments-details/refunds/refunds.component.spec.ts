import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentSearchResult, RefundSearchResult } from '@dsh/api-codegen/capi';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateRefundDialogResponseStatus, CreateRefundService } from './create-refund';
import { RefundsComponent } from './refunds.component';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';

@Component({
    selector: 'dsh-refunds-list',
    template: '',
})
class MockRefundsListComponent {
    @Input() list: RefundSearchResult[];
    @Input() loading: boolean;
    @Input() hasMore: boolean;

    @Output() showMore = new EventEmitter<void>();
}

describe('RefundsComponent', () => {
    let component: RefundsComponent;
    let fixture: ComponentFixture<RefundsComponent>;
    let mockFetchRefundsService: FetchRefundsService;
    let mockCreateRefundService: CreateRefundService;

    beforeEach(() => {
        mockFetchRefundsService = mock(FetchRefundsService);
        mockCreateRefundService = mock(CreateRefundService);
    });

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [getTranslocoModule(), FlexLayoutModule, ButtonModule],
                declarations: [RefundsComponent, MockRefundsListComponent],
                providers: [
                    {
                        provide: FetchRefundsService,
                        useFactory: () => instance(mockFetchRefundsService),
                    },
                    {
                        provide: CreateRefundService,
                        useFactory: () => instance(mockCreateRefundService),
                    },
                ],
            })
                .overrideComponent(RefundsComponent, {
                    set: { providers: [] },
                })
                .compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RefundsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('isRefundAvailable', () => {
        it('should return true if status is captured', () => {
            component.status = PaymentSearchResult.StatusEnum.Captured;

            expect(component.isRefundAvailable).toBe(true);
        });

        it('should return false if status is not captured', () => {
            component.status = PaymentSearchResult.StatusEnum.Pending;

            expect(component.isRefundAvailable).toBe(false);
        });
    });

    describe('createRefund', () => {
        beforeEach(() => {
            component.invoiceID = 'invoiceID';
            component.paymentID = 'paymentID';
            component.shopID = 'shopID';
            component.currency = 'USD';
            component.maxRefundAmount = 4000;
        });

        it('should update refunds list after successful creation refund', () => {
            when(
                mockCreateRefundService.createRefund(
                    deepEqual({
                        invoiceID: component.invoiceID,
                        paymentID: component.paymentID,
                        shopID: component.shopID,
                        currency: component.currency,
                        maxRefundAmount: component.maxRefundAmount,
                    })
                )
            ).thenReturn(
                of({
                    status: CreateRefundDialogResponseStatus.SUCCESS,
                    availableAmount: 400,
                })
            );
            component.createRefund();

            verify(
                mockFetchRefundsService.search(
                    deepEqual({
                        invoiceID: component.invoiceID,
                        paymentID: component.paymentID,
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should emit statusChanged event if available amount equals 0', () => {
            when(
                mockCreateRefundService.createRefund(
                    deepEqual({
                        invoiceID: component.invoiceID,
                        paymentID: component.paymentID,
                        shopID: component.shopID,
                        currency: component.currency,
                        maxRefundAmount: component.maxRefundAmount,
                    })
                )
            ).thenReturn(
                of({
                    status: CreateRefundDialogResponseStatus.SUCCESS,
                    availableAmount: 0,
                })
            );

            const spyOnsStatusChanged = spyOn(component.fullyRefunded, 'emit');

            component.createRefund();

            expect(spyOnsStatusChanged).toHaveBeenCalledTimes(1);
        });

        it('should not update refunds and emit status changed event neither if creation was not successful', () => {
            when(
                mockCreateRefundService.createRefund(
                    deepEqual({
                        invoiceID: component.invoiceID,
                        paymentID: component.paymentID,
                        shopID: component.shopID,
                        currency: component.currency,
                        maxRefundAmount: component.maxRefundAmount,
                    })
                )
            ).thenReturn(
                of({
                    status: CreateRefundDialogResponseStatus.CANCELED,
                })
            );

            const spyOnsStatusChanged = spyOn(component.fullyRefunded, 'emit');

            component.createRefund();

            verify(
                mockFetchRefundsService.search(
                    deepEqual({
                        invoiceID: component.invoiceID,
                        paymentID: component.paymentID,
                    })
                )
            ).never();
            expect(spyOnsStatusChanged).not.toHaveBeenCalled();
        });
    });
});
