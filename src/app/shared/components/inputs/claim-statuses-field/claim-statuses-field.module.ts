import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiSelectFieldModule } from '@dsh/components/form-controls/multi-select-field';

import { ClaimStatusesFieldComponent } from './claim-statuses-field.component';
import { ClaimStatusesLabelPipe } from './pipes/claim-statuses-label.pipe';

@NgModule({
    imports: [CommonModule, TranslocoModule, MultiSelectFieldModule, ReactiveFormsModule],
    declarations: [ClaimStatusesFieldComponent, ClaimStatusesLabelPipe],
    exports: [ClaimStatusesFieldComponent, ClaimStatusesLabelPipe],
})
export class ClaimStatusesFieldModule {}
