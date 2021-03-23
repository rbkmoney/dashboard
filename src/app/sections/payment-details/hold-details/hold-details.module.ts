import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentService } from '@dsh/api/payment';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';
import { CardModule } from '@dsh/components/layout';

import { HumanizeDurationModule } from '../../../humanize-duration';
import { CancelHoldComponent } from './cancel-hold/cancel-hold.component';
import { ConfirmHoldComponent } from './confirm-hold/confirm-hold.component';
import { HoldActivePipe } from './hold-active.pipe';
import { HoldDetailsComponent } from './hold-details.component';

@NgModule({
    imports: [
        TranslocoModule,
        CardModule,
        ButtonModule,
        HumanizeDurationModule,
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FlexModule,
        FormControlsModule,
        BaseDialogModule,
    ],
    declarations: [HoldDetailsComponent, ConfirmHoldComponent, CancelHoldComponent, HoldActivePipe],
    exports: [HoldDetailsComponent],
    providers: [PaymentService],
})
export class HoldDetailsModule {}
