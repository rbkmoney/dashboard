import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { finalize } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

import { generateMockPayment } from '../../tests/generate-mock-payment';
import { generateMockPaymentsList } from '../../tests/generate-mock-payments-list';
import { PaymentsCachingService } from './payments-caching.service';

describe('PaymentsCachingService', () => {
    let service: PaymentsCachingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaymentsCachingService],
        });
        service = TestBed.inject(PaymentsCachingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('payments$', () => {
        it('should return current value after subscribe to observable of all cached payments now', () => {
            const mockPayments = generateMockPaymentsList(5);

            service.addElements(...mockPayments.slice(0, 2));
            service.addElements(...mockPayments.slice(2, 4));
            service.addElements(...mockPayments.slice(4));

            expect(service.payments$).toBeObservable(
                cold('a', {
                    a: mockPayments,
                })
            );
        });
    });

    describe('addElements', () => {
        it('should add new elements in cache', () => {
            const mockPayments = generateMockPaymentsList(5);

            hot('^--a-b--c|', {
                a: mockPayments.slice(0, 2),
                b: mockPayments.slice(2, 4),
                c: mockPayments.slice(4),
            }).subscribe((payments: PaymentSearchResult[]) => {
                service.addElements(...payments);
            });

            expect(service.payments$).toBeObservable(
                cold('a--b-c--d', {
                    a: [],
                    b: mockPayments.slice(0, 2),
                    c: mockPayments.slice(0, 4),
                    d: mockPayments,
                })
            );
        });
    });

    describe('updateElements', () => {
        let mockPayments: PaymentSearchResult[];
        beforeEach(() => {
            mockPayments = generateMockPaymentsList(5);
            service.addElements(...mockPayments);
        });

        it('should update single element', () => {
            const newPayment = generateMockPayment({
                id: mockPayments[2].id,
                invoiceID: mockPayments[2].invoiceID,
            });
            hot('^--a|', {
                a: newPayment,
            }).subscribe((payment: PaymentSearchResult) => {
                service.updateElements(payment);
            });

            const updatedList = mockPayments.slice();
            updatedList.splice(2, 1, newPayment);

            expect(service.payments$).toBeObservable(
                cold('a--b', {
                    a: mockPayments,
                    b: updatedList,
                })
            );
        });

        it('should not update element if it does not exist in cache list', () => {
            const newPayment = generateMockPayment({
                id: 'mock_payment_10',
                invoiceID: 'mine_invoice_id',
            });

            hot('^--a|', {
                a: newPayment,
            }).subscribe((payment: PaymentSearchResult) => {
                service.updateElements(payment);
            });

            expect(service.payments$).toBeObservable(
                cold('a--b', {
                    a: mockPayments,
                    b: mockPayments,
                })
            );
        });

        it('should update a few items in list', () => {
            const newPayments = [
                generateMockPayment({
                    id: mockPayments[1].id,
                    invoiceID: mockPayments[1].invoiceID,
                    createdAt: new Date(),
                }),
                generateMockPayment({
                    id: mockPayments[2].id,
                    invoiceID: mockPayments[2].invoiceID,
                    createdAt: new Date(),
                }),
            ];

            hot('^--a|', {
                a: newPayments,
            }).subscribe((payments: PaymentSearchResult[]) => {
                service.updateElements(...payments);
            });

            const updatedList = mockPayments.slice();
            updatedList.splice(1, 2, ...newPayments);

            expect(service.payments$).toBeObservable(
                cold('a--b', {
                    a: mockPayments,
                    b: updatedList,
                })
            );
        });

        it('should update only existing elements', () => {
            const newPayments = [
                generateMockPayment({
                    id: mockPayments[1].id,
                    invoiceID: mockPayments[1].invoiceID,
                }),
                generateMockPayment({
                    id: mockPayments[2].id,
                    invoiceID: mockPayments[2].invoiceID,
                }),
                generateMockPayment({
                    id: 'mock_payment_10',
                    invoiceID: 'mine_invoice_id',
                }),
            ];

            hot('^--a-b|', {
                a: newPayments.slice(0, 1),
                b: newPayments.slice(1),
            }).subscribe((payments: PaymentSearchResult[]) => {
                service.updateElements(...payments);
            });

            const updatedLists = [mockPayments.slice(), mockPayments.slice()];
            updatedLists[0].splice(1, 1, newPayments[0]);
            updatedLists[1].splice(2, 1, newPayments[1]);

            expect(service.payments$).toBeObservable(
                cold('a--b-c', {
                    a: mockPayments,
                    b: updatedLists[0],
                    c: updatedLists[1],
                })
            );
        });
    });

    describe('clear', () => {
        it('should clear cache data', () => {
            const mockPayments = generateMockPaymentsList(5);

            hot('^--a-b--c---|', {
                a: mockPayments.slice(0, 2),
                b: mockPayments.slice(2, 4),
                c: mockPayments.slice(4),
            })
                .pipe(
                    finalize(() => {
                        service.clear();
                    })
                )
                .subscribe((payments: PaymentSearchResult[]) => {
                    service.addElements(...payments);
                });

            expect(service.payments$).toBeObservable(
                cold('a--b-c--d---e', {
                    a: [],
                    b: mockPayments.slice(0, 2),
                    c: mockPayments.slice(0, 4),
                    d: mockPayments,
                    e: [],
                })
            );
        });
    });
});
