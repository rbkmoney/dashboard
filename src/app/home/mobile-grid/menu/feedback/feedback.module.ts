import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { FeedbackComponent } from './feedback.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    imports: [CommonModule, MatIconModule, FlexModule, TranslocoModule],
    declarations: [FeedbackComponent],
    exports: [FeedbackComponent],
})
export class FeedbackModule {}
