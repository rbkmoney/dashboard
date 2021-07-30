import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RadioGroupFieldModule } from '@dsh/components/form-controls/radio-group-field';

import { RealmSelectorComponent } from './realm-selector.component';

@NgModule({
    imports: [CommonModule, RadioGroupFieldModule, ReactiveFormsModule],
    declarations: [RealmSelectorComponent],
    exports: [RealmSelectorComponent],
})
export class RealmSelectorModule {}
