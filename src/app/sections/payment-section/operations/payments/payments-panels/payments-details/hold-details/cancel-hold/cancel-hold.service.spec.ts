import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { CancelHoldService } from './cancel-hold.service';
import { CancelHoldDialogComponent } from './components/cancel-hold-dialog/cancel-hold-dialog.component';
import { CancelHoldDialogData } from './types/cancel-hold-dialog-data';

describe('CancelHoldService', () => {
    let service: CancelHoldService;
    let mockMatDialog: MatDialog;
    let mockMatDialogRef: MatDialogRef<CancelHoldDialogComponent>;

    beforeEach(() => {
        mockMatDialog = mock(MatDialog);
        mockMatDialogRef = mock<MatDialogRef<CancelHoldDialogComponent>>(MatDialogRef);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CancelHoldService,
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
            ],
        });
        service = TestBed.inject(CancelHoldService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('openDialog', () => {
        it('should open CancelHoldDialogComponent using provided data', () => {
            const data: CancelHoldDialogData = {
                invoiceID: 'invoiceID',
                paymentID: 'paymentID',
            };

            when(
                mockMatDialog.open(
                    CancelHoldDialogComponent,
                    deepEqual({
                        data,
                    })
                )
            ).thenReturn(instance(mockMatDialogRef));

            service.openDialog(data);

            verify(
                mockMatDialog.open(
                    CancelHoldDialogComponent,
                    deepEqual({
                        data,
                    })
                )
            );
            expect().nothing();
        });
    });
});
