import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { InvoiceStatus } from '@dsh/api-codegen/capi';
import { InvoiceSearchService } from '@dsh/api/search';
import { NotificationService } from '@dsh/app/shared/services/notification';

import { InvoiceDetailsService } from './invoice-details.service';

describe('InvoiceDetailsService', () => {
    let service: InvoiceDetailsService;
    let mockInvoiceSearchService: InvoiceSearchService;
    let mockNotificationService: NotificationService;

    beforeEach(() => {
        mockInvoiceSearchService = mock(InvoiceSearchService);
        mockNotificationService = mock(NotificationService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InvoiceDetailsService,
                {
                    provide: InvoiceSearchService,
                    useFactory: () => instance(mockInvoiceSearchService),
                },
                {
                    provide: NotificationService,
                    useFactory: () => instance(mockNotificationService),
                },
            ],
        });
        service = TestBed.inject(InvoiceDetailsService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    describe('invoice$', () => {
        it('should emit invoice data', () => {
            const date = new Date();
            const invoiceData = {
                id: 'invoice_id',
                shopID: 'shop_id',
                status: InvoiceStatus.StatusEnum.Paid,
                createdAt: date,
                dueDate: date,
                amount: 20,
                currency: 'USD',
                product: null,
                metadata: {},
            };
            when(
                mockInvoiceSearchService.getInvoiceByDuration(deepEqual({ amount: 3, unit: 'y' }), 'invoice_id')
            ).thenReturn(of(invoiceData));

            service.setInvoiceID('invoice_id');

            expect(service.invoice$).toBeObservable(
                cold('a', {
                    a: invoiceData,
                })
            );
        });
    });

    describe('error$', () => {
        const testError = new Error('Test Error');

        beforeEach(() => {
            when(
                mockInvoiceSearchService.getInvoiceByDuration(deepEqual({ amount: 3, unit: 'y' }), 'invoice_id')
            ).thenReturn(
                of(null).pipe(
                    switchMap(() => {
                        throw testError;
                    })
                )
            );

            service.setInvoiceID('invoice_id');
        });

        it('should translate errors from invoice requests', () => {
            expect(service.error$).toBeObservable(
                cold('(a|)', {
                    a: testError,
                })
            );
        });

        it('should notify about errors inside service', () => {
            verify(mockNotificationService.error()).once();
            expect().nothing();
        });
    });

    describe('setInvoiceID', () => {
        it('should request invoice using id', () => {
            when(
                mockInvoiceSearchService.getInvoiceByDuration(deepEqual({ amount: 3, unit: 'y' }), 'invoice_id')
            ).thenReturn(of(null));

            service.setInvoiceID('invoice_id');
            service.invoice$.pipe(take(1)).subscribe();

            verify(
                mockInvoiceSearchService.getInvoiceByDuration(deepEqual({ amount: 3, unit: 'y' }), 'invoice_id')
            ).once();
            expect().nothing();
        });
    });
});
