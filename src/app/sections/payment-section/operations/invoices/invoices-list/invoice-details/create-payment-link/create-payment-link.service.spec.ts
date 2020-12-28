import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { generateMockInvoice } from '../../../tests/generate-mock-invoice';
import { CreatePaymentLinkDialogComponent } from './components/create-payment-link-dialog/create-payment-link-dialog.component';
import { CreatePaymentLinkService } from './create-payment-link.service';
import { CreatePaymentLinkDialogConfig } from './types/create-payment-link-dialog-config';

describe('CreatePaymentLinkService', () => {
    let service: CreatePaymentLinkService;
    let mockMatDialog: MatDialog;
    let mockDialogRef: MatDialogRef<CreatePaymentLinkDialogComponent>;

    beforeEach(() => {
        mockMatDialog = mock(MatDialog);
        mockDialogRef = mock(MatDialogRef);
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                CreatePaymentLinkService,
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
            ],
        });
        service = TestBed.inject(CreatePaymentLinkService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createPaymentLink', () => {
        beforeEach(() => {
            when(
                mockMatDialog.open(
                    CreatePaymentLinkDialogComponent,
                    deepEqual({
                        width: '720px',
                        maxHeight: '90vh',
                        disableClose: true,
                    })
                )
            ).thenReturn(instance(mockDialogRef));
        });

        afterEach(() => {
            // ts mockito not work properly with jasmine expectations so we need to make expect like that
            expect().nothing();
        });

        it('should open dialog', () => {
            const config: CreatePaymentLinkDialogConfig = { invoice: generateMockInvoice(0) };

            service.createPaymentLink(config);

            verify(
                mockMatDialog.open(
                    CreatePaymentLinkDialogComponent,
                    deepEqual({
                        width: '720px',
                        maxHeight: '90vh',
                        disableClose: true,
                        data: config,
                    })
                )
            ).once();
        });
    });
});
