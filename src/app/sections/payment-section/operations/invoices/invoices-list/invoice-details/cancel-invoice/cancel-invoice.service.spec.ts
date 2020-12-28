import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { InvoiceService } from '@dsh/api/invoice';

import { CancelInvoiceService } from './cancel-invoice.service';
import { CancelInvoiceDialogComponent } from './components/cancel-invoice-dialog/cancel-invoice-dialog.component';

describe('CancelInvoiceService', () => {
    let service: CancelInvoiceService;
    let mockInvoiceService: InvoiceService;
    let mockMatDialog: MatDialog;
    let mockSnackbar: MatSnackBar;
    let mockDialogRef: MatDialogRef<CancelInvoiceDialogComponent>;

    beforeEach(() => {
        mockInvoiceService = mock(InvoiceService);
        mockMatDialog = mock(MatDialog);
        mockSnackbar = mock(MatSnackBar);
        mockDialogRef = mock(MatDialogRef);
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        operations: {
                            invoices: {
                                actions: {
                                    invoiceCancelled: 'invoice was cancelled',
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
                CancelInvoiceService,
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
        service = TestBed.inject(CancelInvoiceService);
        await TestBed.inject(TranslocoService).load('operations').toPromise();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('cancelInvoice', () => {
        beforeEach(() => {
            when(
                mockMatDialog.open(
                    CancelInvoiceDialogComponent,
                    deepEqual({
                        width: '720px',
                        maxHeight: '90vh',
                        disableClose: true,
                    })
                )
            ).thenReturn(instance(mockDialogRef));
            when(mockInvoiceService.rescindInvoice('test', deepEqual({ reason: 'test' }))).thenReturn(of(null));
            when(mockSnackbar.open('invoice was cancelled', 'OK', deepEqual({ duration: 2000 }))).thenReturn(null);
        });

        afterEach(() => {
            // ts mockito not work properly with jasmine expectations so we need to make expect like that
            expect().nothing();
        });

        it('should open dialog', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of(null));

            service.cancelInvoice('test');

            verify(
                mockMatDialog.open(
                    CancelInvoiceDialogComponent,
                    deepEqual({
                        width: '720px',
                        maxHeight: '90vh',
                        disableClose: true,
                    })
                )
            ).once();
        });

        it('should not return reason if dialog was cancelled', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('cancel'));

            expect(service.cancelInvoice('test')).toBeObservable(cold(''));
        });

        it('should emit undefined after invoice cancellation', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of({ reason: 'test' }));

            expect(service.cancelInvoice('test')).toBeObservable(
                cold('a', {
                    a: undefined,
                })
            );
        });

        it('should show snack bar after invoice cancellation', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of({ reason: 'test' }));

            service.cancelInvoice('test');

            verify(mockSnackbar.open('invoice was cancelled', 'OK', deepEqual({ duration: 2000 }))).once();
        });
    });
});
