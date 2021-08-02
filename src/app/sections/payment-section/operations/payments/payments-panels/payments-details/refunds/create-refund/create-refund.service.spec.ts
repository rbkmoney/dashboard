import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { CreateRefundDialogComponent } from './components/create-refund-dialog/create-refund-dialog.component';
import { CreateRefundService } from './create-refund.service';
import { CreateRefundDialogResponse } from './types/create-refund-dialog-response';
import { CreateRefundDialogResponseStatus } from './types/create-refund-dialog-response-status';

describe('CreateRefundService', () => {
    let service: CreateRefundService;
    let mockMatDialog: MatDialog;
    let mockMatDialogRef: MatDialogRef<CreateRefundDialogComponent, CreateRefundDialogResponse>;

    beforeEach(() => {
        mockMatDialog = mock(MatDialog);
        mockMatDialogRef = mock<MatDialogRef<CreateRefundDialogComponent, CreateRefundDialogResponse>>(MatDialogRef);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CreateRefundService,
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
            ],
        });
        service = TestBed.inject(CreateRefundService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    describe('createRefund', () => {
        it('should open dialog using provided data', () => {
            const data = {
                shopID: 'shopID',
                invoiceID: 'invoiceID',
                paymentID: 'paymentID',
                currency: 'USD',
                maxRefundAmount: 500,
            };

            when(
                mockMatDialog.open(
                    CreateRefundDialogComponent,
                    deepEqual({
                        data,
                    })
                )
            ).thenReturn(instance(mockMatDialogRef));
            when(mockMatDialogRef.afterClosed()).thenReturn(
                of({
                    status: CreateRefundDialogResponseStatus.Success,
                })
            );

            expect(service.createRefund(data)).toBeObservable(
                cold('(a|)', {
                    a: {
                        status: CreateRefundDialogResponseStatus.Success,
                    },
                })
            );
        });
    });
});
