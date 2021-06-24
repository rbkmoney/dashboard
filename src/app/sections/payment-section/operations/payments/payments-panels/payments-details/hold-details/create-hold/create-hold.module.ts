import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { MaxLengthInputModule } from '@dsh/app/shared/components/inputs/max-length-input/max-length-input.module';
import { ButtonModule } from '@dsh/components/buttons';
import { FormatInputModule } from '@dsh/components/form-controls';

import { CreateHoldDialogComponent } from './components/create-hold-dialog/create-hold-dialog.component';
import { CreateHoldService } from './create-hold.service';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        MatCheckboxModule,
        MaxLengthInputModule,
        MatFormFieldModule,
        FormatInputModule,
        ButtonModule,
    ],
    declarations: [CreateHoldDialogComponent],
    providers: [CreateHoldService],
})
export class CreateHoldModule {}
