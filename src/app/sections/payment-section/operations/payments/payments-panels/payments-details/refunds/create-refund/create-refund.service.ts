import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { CreateRefundDialogComponent } from './components/create-refund-dialog/create-refund-dialog.component';
import { CreateRefundDialogData } from './types/create-refund-dialog-data';
import { CreateRefundDialogResponse } from './types/create-refund-dialog-response';

@Injectable()
export class CreateRefundService {
    constructor(@Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig, private dialog: MatDialog) {}

    createRefund(data: CreateRefundDialogData): Observable<CreateRefundDialogResponse> {
        return this.dialog
            .open<CreateRefundDialogComponent, CreateRefundDialogData>(CreateRefundDialogComponent, {
                ...this.dialogConfig.medium,
                data,
            })
            .afterClosed();
    }
}
