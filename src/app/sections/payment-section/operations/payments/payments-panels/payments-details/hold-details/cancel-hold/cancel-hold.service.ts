import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { CancelHoldDialogComponent } from './components/cancel-hold-dialog/cancel-hold-dialog.component';
import { CancelHoldDialogData } from './types/cancel-hold-dialog-data';

@Injectable()
export class CancelHoldService {
    constructor(@Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig, private dialog: MatDialog) {}

    openDialog(data: CancelHoldDialogData): Observable<BaseDialogResponseStatus> {
        return this.dialog
            .open<CancelHoldDialogComponent, CancelHoldDialogData>(CancelHoldDialogComponent, {
                ...this.dialogConfig.medium,
                data,
            })
            .afterClosed();
    }
}
