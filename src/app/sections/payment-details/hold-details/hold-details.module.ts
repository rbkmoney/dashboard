import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule } from '../../../layout/card';
import { ButtonModule } from '../../../button';
import { HoldDetailsComponent } from './hold-details.component';
import { HumanizeDurationModule } from '../../../humanize-duration';

@NgModule({
    imports: [TranslocoModule, CardModule, FlexModule, ButtonModule, HumanizeDurationModule, CommonModule],
    declarations: [HoldDetailsComponent],
    exports: [HoldDetailsComponent]
})
export class HoldDetailsModule {}
