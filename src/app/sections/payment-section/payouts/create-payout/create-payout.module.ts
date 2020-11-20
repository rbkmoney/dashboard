import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelTypesModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { FormatInputModule } from '@dsh/components/form-controls';
import { SpinnerModule } from '@dsh/components/indicators';

import { CreatePayoutDialogComponent } from './create-payout-dialog.component';
import { CreatePayoutService } from './create-payout.service';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        MatSnackBarModule,
        MatDialogModule,
        FlexLayoutModule,
        ButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        SpinnerModule,
        FormatInputModule,
        ApiModelTypesModule,
    ],
    declarations: [CreatePayoutDialogComponent],
    providers: [CreatePayoutService],
    entryComponents: [CreatePayoutDialogComponent],
})
export class CreatePayoutModule {}
