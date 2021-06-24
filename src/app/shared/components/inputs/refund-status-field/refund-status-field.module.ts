import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { RadioGroupFieldModule } from '@dsh/components/form-controls/radio-group-field';

import { RefundStatusLabelPipe } from './pipes/refund-status-label.pipe';
import { RefundStatusFieldComponent } from './refund-status-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, RadioGroupFieldModule],
    declarations: [RefundStatusFieldComponent, RefundStatusLabelPipe],
    exports: [RefundStatusFieldComponent, RefundStatusLabelPipe],
})
export class RefundStatusFieldModule {}
