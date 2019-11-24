import { NgModule } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonModule } from '../button';
import { ConfirmActionDialog } from './confirm-action-dialog.component';

@NgModule({
    imports: [MatDialogModule, TranslocoModule, ButtonModule, FlexLayoutModule],
    declarations: [ConfirmActionDialog],
    exports: [ConfirmActionDialog],
    entryComponents: [ConfirmActionDialog],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                width: '450px',
                hasBackdrop: true,
                disableClose: true
            } as MatDialogConfig
        }
    ]
})
export class ConfirmActionDialogModule {}
