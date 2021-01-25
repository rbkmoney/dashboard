import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { CreateHoldDialogComponent } from './components/create-hold-dialog/create-hold-dialog.component';
import { CreateHoldDialogData } from './types/create-hold-dialog-data';

@Injectable()
export class CreateHoldService {
    constructor(@Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig, private dialog: MatDialog) {}

    openDialog(data: CreateHoldDialogData): Observable<BaseDialogResponseStatus> {
        return this.dialog
            .open<CreateHoldDialogComponent, CreateHoldDialogData>(CreateHoldDialogComponent, {
                ...this.dialogConfig.medium,
                data,
            })
            .afterClosed();
    }
}
