import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { DaterangeSelectorComponent } from './daterange-selector.component';
import { ButtonToggleModule } from '../../../../button-toggle';

@NgModule({
    imports: [CommonModule, ButtonToggleModule, MatIconModule, TranslocoModule],
    declarations: [DaterangeSelectorComponent],
    exports: [DaterangeSelectorComponent]
})
export class DaterangeSelectorModule {}
