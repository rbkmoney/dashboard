import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { instance, mock, when } from 'ts-mockito';

import { PaymentService } from '@dsh/api/payment';

import { generateMockPaymentList } from '../../../../tests/generate-mock-payment-list';
import { ReceivePaymentsService } from './receive-payments.service';

describe('ReceivePaymentsService', () => {
    let service: ReceivePaymentsService;
    let mockPaymentService: PaymentService;
    let mockSnackbar: MatSnackBar;

    beforeEach(() => {
        mockPaymentService = mock(PaymentService);
        mockSnackbar = mock(MatSnackBar);
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                ReceivePaymentsService,
                {
                    provide: PaymentService,
                    useFactory: () => instance(mockPaymentService),
                },
            ],
        });
        service = TestBed.inject(ReceivePaymentsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('payments$', () => {
        beforeEach(() => {
            when(mockPaymentService.getPayments('test')).thenReturn(of(generateMockPaymentList(3)));
        });

        it('should receive payments', () => {
            service.receivePayments('test');

            expect(service.payments$).toBeObservable(cold('a', { a: generateMockPaymentList(3) }));
        });
    });

    describe('error$', () => {
        beforeEach(() => {
            when(mockPaymentService.getPayments('test')).thenReturn(throwError('error'));
        });

        it('should emit error', () => {
            service.errorOccurred$.subscribe((res) => expect(res).toBe(undefined));

            service.receivePayments('test');
        });
    });

    describe('isLoading$', () => {
        it('should emit trigger isLoading by payments', (done) => {
            when(mockPaymentService.getPayments('test')).thenReturn(of(generateMockPaymentList(3)));

            let count = 0;
            service.isLoading$.pipe(take(3)).subscribe((res) => {
                switch (count) {
                    case 0:
                        expect(res).toBe(false);
                        break;
                    case 1:
                        expect(res).toBe(true);
                        break;
                    case 2:
                        expect(res).toBe(false);
                        done();
                        break;
                }
                count += 1;
            });

            service.receivePayments('test');
        });

        it('should emit trigger isLoading by error', (done) => {
            when(mockPaymentService.getPayments('test')).thenReturn(throwError('error'));

            let count = 0;
            service.isLoading$.pipe(take(3)).subscribe((res) => {
                switch (count) {
                    case 0:
                        expect(res).toBe(false);
                        break;
                    case 1:
                        expect(res).toBe(true);
                        break;
                    case 2:
                        expect(res).toBe(false);
                        done();
                        break;
                }
                count += 1;
            });

            service.receivePayments('test');
        });
    });
});
