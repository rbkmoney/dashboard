import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { FeedbackDialogModule } from '@dsh/app/shared/components/dialog';

import { FeedbackComponent } from './feedback.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FeedbackDialogModule],
    declarations: [FeedbackComponent],
    exports: [FeedbackComponent],
})
export class FeedbackModule {}
