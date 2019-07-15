import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { DaterangeSelectorComponent } from './daterange-selector.component';
import { LocaleModule } from '../../../../locale';
import { ButtonToggleModule } from '../../../../button-toggle';

@NgModule({
    imports: [CommonModule, LocaleModule, ButtonToggleModule, MatIconModule],
    declarations: [DaterangeSelectorComponent],
    exports: [DaterangeSelectorComponent]
})
export class DaterangeSelectorModule {}
