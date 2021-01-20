import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { take } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

import { generateMockPaymentsList } from '../../tests/generate-mock-payments-list';
import { PaymentsCachingService } from './payments-caching.service';

fdescribe('PaymentsCachingService', () => {
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
        it('should be an observable of all cached payments right now', () => {
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

            const expected$ = cold('a--b-c--d', {
                a: [],
                b: mockPayments.slice(0, 2),
                c: mockPayments.slice(0, 4),
                d: mockPayments,
            });

            hot('^--a-b--c', {
                a: mockPayments.slice(0, 2),
                b: mockPayments.slice(2, 4),
                c: mockPayments.slice(4),
            })
                .pipe(take(3))
                .subscribe((payments: PaymentSearchResult[]) => {
                    service.addElements(...payments);
                });

            expect(service.payments$).toBeObservable(expected$);
        });
    });
    // updateElements
    // clear
});
