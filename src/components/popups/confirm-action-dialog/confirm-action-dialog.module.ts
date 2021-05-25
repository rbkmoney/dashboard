import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { ConfirmActionDialogComponent } from './confirm-action-dialog.component';

@NgModule({
    imports: [TranslocoModule, ButtonModule, FlexLayoutModule, BaseDialogModule],
    declarations: [ConfirmActionDialogComponent],
    exports: [ConfirmActionDialogComponent],
})
export class ConfirmActionDialogModule {}
