import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { CancelHoldDialogComponent } from '../cancel-hold/components/cancel-hold-dialog/cancel-hold-dialog.component';
import { CreateHoldDialogComponent } from './components/create-hold-dialog/create-hold-dialog.component';
import { CreateHoldService } from './create-hold.service';
import { CreateHoldDialogData } from './types/create-hold-dialog-data';

describe('CreateHoldService', () => {
    let service: CreateHoldService;
    let mockMatDialog: MatDialog;
    let mockMatDialogRef: MatDialogRef<CreateHoldDialogComponent>;

    beforeEach(() => {
        mockMatDialog = mock(MatDialog);
        mockMatDialogRef = mock(MatDialogRef);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CreateHoldService,
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
            ],
        });
        service = TestBed.inject(CreateHoldService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('openDialog', () => {
        it('should open CancelHoldDialogComponent using provided data', () => {
            const data: CreateHoldDialogData = {
                invoiceID: 'invoiceID',
                paymentID: 'paymentID',
                currency: 'USD',
                maxAllowedAmount: 4000,
            };

            when(
                mockMatDialog.open(
                    CreateHoldDialogComponent,
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
