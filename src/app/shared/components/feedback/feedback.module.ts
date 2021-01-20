import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonModule } from '../../../../components/buttons';
import { SenderModule } from '../../../api/sender';
import { ErrorModule } from '../../services';
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
    ],
    declarations: [FeedbackComponent, FeedbackDialogComponent],
    exports: [FeedbackComponent],
    providers: [],
})
export class FeedbackModule {}
