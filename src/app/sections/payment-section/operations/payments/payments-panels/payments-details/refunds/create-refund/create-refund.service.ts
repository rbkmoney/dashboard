import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { CreateRefundDialogComponent } from './components/create-refund-dialog/create-refund-dialog.component';
import { CreateRefundDialogData } from './types/create-refund-dialog-data';
import { CreateRefundDialogResponse } from './types/create-refund-dialog-response';

@Injectable()
export class CreateRefundService {
    constructor(private dialog: MatDialog) {}

    createRefund(data: CreateRefundDialogData): Observable<CreateRefundDialogResponse> {
        return this.dialog
            .open<CreateRefundDialogComponent, CreateRefundDialogData>(CreateRefundDialogComponent, { data })
            .afterClosed();
    }
}
