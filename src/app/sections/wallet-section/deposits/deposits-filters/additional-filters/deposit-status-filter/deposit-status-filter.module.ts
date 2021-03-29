import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { RadioButtonsModule } from '@dsh/app/shared/components/radio-buttons';

import { DepositStatusFilterComponent } from './deposit-status-filter.component';

@NgModule({
    declarations: [DepositStatusFilterComponent],
    imports: [FlexModule, CommonModule, TranslocoModule, RadioButtonsModule],
    exports: [DepositStatusFilterComponent],
})
export class DepositStatusFilterModule {}
