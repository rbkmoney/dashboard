import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { instance, mock, when } from 'ts-mockito';

import { InvoiceService } from '@dsh/api/invoice';

import { generateMockInvoice } from '../../../../tests/generate-mock-invoice';
import { ReceiveInvoiceService } from './receive-invoice.service';

describe('ReceiveInvoiceService', () => {
    let service: ReceiveInvoiceService;
    let mockInvoiceService: InvoiceService;
    let mockSnackbar: MatSnackBar;

    beforeEach(() => {
        mockInvoiceService = mock(InvoiceService);
        mockSnackbar = mock(MatSnackBar);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ReceiveInvoiceService,
                {
                    provide: InvoiceService,
                    useFactory: () => instance(mockInvoiceService),
                },
            ],
        });
        service = TestBed.inject(ReceiveInvoiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('invoice$', () => {
        beforeEach(() => {
            when(mockInvoiceService.getInvoiceByID('test')).thenReturn(of(generateMockInvoice('test')));
        });

        it('should receive invoice', () => {
            service.receiveInvoice('test');

            expect(service.invoice$).toBeObservable(cold('a', { a: generateMockInvoice('test') }));
        });
    });

    describe('error$', () => {
        beforeEach(() => {
            when(mockInvoiceService.getInvoiceByID('test')).thenReturn(throwError('error'));
        });

        it('should emit error', () => {
            service.errorOccurred$.subscribe((res) => expect(res).toBe(undefined));

            service.receiveInvoice('test');
        });
    });

    describe('isLoading$', () => {
        it('should emit trigger isLoading by invoice', (done) => {
            when(mockInvoiceService.getInvoiceByID('test')).thenReturn(of(generateMockInvoice('test')));

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

            service.receiveInvoice('test');
        });

        it('should emit trigger isLoading by error', (done) => {
            when(mockInvoiceService.getInvoiceByID('test')).thenReturn(throwError('error'));

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

            service.receiveInvoice('test');
        });
    });
});
