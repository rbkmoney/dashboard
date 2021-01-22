import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { DEFAULT_DIALOG_CONFIG, DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { CancelHoldService } from './cancel-hold.service';
import { CancelHoldDialogComponent } from './components/cancel-hold-dialog/cancel-hold-dialog.component';
import { CancelHoldDialogData } from './types/cancel-hold-dialog-data';

describe('CancelHoldService', () => {
    let service: CancelHoldService;
    let mockMatDialog: MatDialog;
    let mockMatDialogRef: MatDialogRef<CancelHoldDialogComponent>;

    beforeEach(() => {
        mockMatDialog = mock(MatDialog);
        mockMatDialogRef = mock(MatDialogRef);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CancelHoldService,
                {
                    provide: DIALOG_CONFIG,
                    useValue: DEFAULT_DIALOG_CONFIG,
                },
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
                        ...DEFAULT_DIALOG_CONFIG.medium,
                        data,
                    })
                )
            ).thenReturn(instance(mockMatDialogRef));

            service.openDialog(data);

            verify(
                mockMatDialog.open(
                    CancelHoldDialogComponent,
                    deepEqual({
                        ...DEFAULT_DIALOG_CONFIG.medium,
                        data,
                    })
                )
            );
            expect().nothing();
        });
    });
});
