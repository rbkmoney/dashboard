import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RadioGroupFieldModule } from '@dsh/components/form-controls/radio-group-field';

import { EnvironmentSelectorComponent } from './environment-selector.component';

@NgModule({
    imports: [CommonModule, RadioGroupFieldModule, ReactiveFormsModule],
    declarations: [EnvironmentSelectorComponent],
    exports: [EnvironmentSelectorComponent],
})
export class EnvironmentSelectorModule {}
