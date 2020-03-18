import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonToggleModule } from '../../../../button-toggle';
import { DaterangeSelectorComponent } from './daterange-selector.component';

@NgModule({
    imports: [CommonModule, ButtonToggleModule, MatIconModule, TranslocoModule],
    declarations: [DaterangeSelectorComponent],
    exports: [DaterangeSelectorComponent]
})
export class DaterangeSelectorModule {}
