import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { SenderModule } from '@dsh/api/sender';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorModule } from '@dsh/app/shared/services';
import { ButtonModule } from '@dsh/components/buttons';

import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';
import { FeedbackComponent } from './feedback.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        SenderModule,
        ErrorModule,
        BaseDialogModule,
    ],
    declarations: [FeedbackComponent, FeedbackDialogComponent],
    exports: [FeedbackComponent],
})
export class FeedbackModule {}
