import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EnvironmentLabelPipe } from '@dsh/app/shared/components/environment-selector/pipes/environment-label.pipe';
import { RadioGroupFieldModule } from '@dsh/components/form-controls/radio-group-field';

import { EnvironmentSelectorComponent } from './environment-selector.component';

@NgModule({
    imports: [CommonModule, RadioGroupFieldModule, ReactiveFormsModule],
    declarations: [EnvironmentSelectorComponent, EnvironmentLabelPipe],
    exports: [EnvironmentSelectorComponent],
})
export class EnvironmentSelectorModule {}
