import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExpandableRadioGroupModule } from './expandable-radio-group';

const MODULES = [ExpandableRadioGroupModule];

@NgModule({
    imports: [CommonModule],
    exports: MODULES,
})
export class RadioButtonsModule {}
