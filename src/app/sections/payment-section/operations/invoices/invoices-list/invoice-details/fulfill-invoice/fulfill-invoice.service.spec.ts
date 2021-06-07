import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { InvoiceService } from '@dsh/api/invoice';

import { FulfillInvoiceDialogComponent } from './components/cancel-invoice-dialog/fulfill-invoice-dialog.component';
import { FulfillInvoiceService } from './fulfill-invoice.service';

describe('FulfillInvoiceService', () => {
    let service: FulfillInvoiceService;
    let mockInvoiceService: InvoiceService;
    let mockMatDialog: MatDialog;
    let mockSnackbar: MatSnackBar;
    let mockDialogRef: MatDialogRef<FulfillInvoiceDialogComponent>;

    beforeEach(() => {
        mockInvoiceService = mock(InvoiceService);
        mockMatDialog = mock(MatDialog);
        mockSnackbar = mock(MatSnackBar);
        mockDialogRef = mock<MatDialogRef<FulfillInvoiceDialogComponent>>(MatDialogRef);
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        operations: {
                            invoices: {
                                actions: {
                                    invoiceFulfilled: 'invoice was fulfilled',
                                },
                            },
                        },
                    },
                    {
                        availableLangs: ['operations'],
                        defaultLang: 'operations',
                    }
                ),
            ],
            providers: [
                FulfillInvoiceService,
                {
                    provide: InvoiceService,
                    useFactory: () => instance(mockInvoiceService),
                },
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockSnackbar),
                },
            ],
        });
        service = TestBed.inject(FulfillInvoiceService);
        await TestBed.inject(TranslocoService).load('operations').toPromise();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('fulfillInvoice', () => {
        beforeEach(() => {
            when(
                mockMatDialog.open(
                    FulfillInvoiceDialogComponent,
                    deepEqual({
                        width: '720px',
                    })
                )
            ).thenReturn(instance(mockDialogRef));
            when(mockInvoiceService.fulfillInvoice('test', deepEqual({ reason: 'test' }))).thenReturn(of(null));
            when(mockSnackbar.open('invoice was fulfilled', 'OK', deepEqual({ duration: 2000 }))).thenReturn(null);
        });

        afterEach(() => {
            // ts mockito not work properly with jasmine expectations so we need to make expect like that
            expect().nothing();
        });

        it('should open dialog', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('cancel'));

            service.fulfillInvoice('test');

            verify(
                mockMatDialog.open(
                    FulfillInvoiceDialogComponent,
                    deepEqual({
                        width: '720px',
                    })
                )
            ).once();
        });

        it('should not return reason if dialog was cancelled', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('cancel'));

            expect(service.fulfillInvoice('test')).toBeObservable(cold(''));
        });

        it('should emit undefined after invoice fulfilling', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of({ reason: 'test' }));

            expect(service.fulfillInvoice('test')).toBeObservable(
                cold('a', {
                    a: undefined,
                })
            );
        });

        it('should show snack bar after invoice fulfilling', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of({ reason: 'test' }));

            service.fulfillInvoice('test');

            verify(mockSnackbar.open('invoice was fulfilled', 'OK', deepEqual({ duration: 2000 }))).once();
        });
    });
});
