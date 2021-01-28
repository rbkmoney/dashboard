import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { Refund } from '@dsh/api-codegen/capi';
import { RefundService } from '@dsh/api/refund';

import { RefundsService } from './refunds.service';

describe('RefundsService', () => {
    let service: RefundsService;
    let mockRefundService: RefundService;

    beforeEach(() => {
        mockRefundService = mock(RefundService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RefundsService,
                {
                    provide: RefundService,
                    useFactory: () => instance(mockRefundService),
                },
            ],
        });
        service = TestBed.inject(RefundsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createRefund', () => {
        it('should proxy params to api refund service', () => {
            const refund = {
                id: 'my_id',
                createdAt: new Date(),
                amount: 400,
                currency: 'USD',
                status: Refund.StatusEnum.Succeeded,
            };
            when(
                mockRefundService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        amount: 400,
                        currency: 'USD',
                    })
                )
            ).thenReturn(of(refund));

            expect(
                service.createRefund('invoiceID', 'paymentID', {
                    amount: 400,
                    currency: 'USD',
                })
            ).toBeObservable(
                cold('(a|)', {
                    a: refund,
                })
            );
        });
    });

    describe('getRefundedAmountSum', () => {
        it('should request all refunds and sum their amounts', () => {
            const refundsList = new Array(5)
                .fill({
                    id: '',
                    createdAt: new Date(),
                    amount: 0,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                })
                .map((refund: Refund, index: number) => {
                    return {
                        ...refund,
                        id: `refund_id_${index}`,
                        amount: (index + 1) * 100,
                    };
                });

            when(mockRefundService.getRefunds('invoiceID', 'paymentID')).thenReturn(of(refundsList));

            expect(service.getRefundedAmountSum('invoiceID', 'paymentID')).toBeObservable(
                cold('(a|)', {
                    a: 1500,
                })
            );
        });
    });
});
