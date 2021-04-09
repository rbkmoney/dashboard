import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { ConfirmActionDialogComponent } from './confirm-action-dialog.component';

@NgModule({
    imports: [TranslocoModule, ButtonModule, FlexLayoutModule, BaseDialogModule],
    declarations: [ConfirmActionDialogComponent],
    exports: [ConfirmActionDialogComponent],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                width: '456px',
                hasBackdrop: true,
                disableClose: true,
            } as MatDialogConfig,
        },
    ],
})
export class ConfirmActionDialogModule {}
