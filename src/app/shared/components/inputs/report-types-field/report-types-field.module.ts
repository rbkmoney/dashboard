import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';
import { MultiSelectFieldModule } from '@dsh/components/form-controls/multi-select-field';

import { ReportTypesLabelPipe } from './pipes/report-types-label.pipe';
import { ReportTypesFieldComponent } from './report-types-field.component';

@NgModule({
    imports: [MultiselectFilterModule, CommonModule, TranslocoModule, MultiSelectFieldModule, ReactiveFormsModule],
    declarations: [ReportTypesFieldComponent, ReportTypesLabelPipe],
    exports: [ReportTypesFieldComponent, ReportTypesLabelPipe],
})
export class ReportTypesFieldModule {}
