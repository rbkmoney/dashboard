import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { SenderModule } from '@dsh/api/sender';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { FeedbackDialogComponent } from './feedback-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        TranslocoModule,
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        SenderModule,
        MatDialogModule,
    ],
    declarations: [FeedbackDialogComponent],
    exports: [FeedbackDialogComponent],
})
export class FeedbackDialogModule {}
