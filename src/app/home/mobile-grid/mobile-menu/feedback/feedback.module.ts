import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { FeedbackDialogModule } from '@dsh/app/shared/components/dialog';

import { FeedbackComponent } from './feedback.component';

@NgModule({
    imports: [CommonModule, MatIconModule, FlexModule, TranslocoModule, FeedbackDialogModule],
    declarations: [FeedbackComponent],
    exports: [FeedbackComponent],
})
export class FeedbackModule {}
