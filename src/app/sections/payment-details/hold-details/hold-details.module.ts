import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule } from '@dsh/components/layout';

import { HumanizeDurationModule } from '../../../humanize-duration';
import { HoldDetailsComponent } from './hold-details.component';

@NgModule({
    imports: [TranslocoModule, CardModule, FlexModule, ButtonModule, HumanizeDurationModule, CommonModule],
    declarations: [HoldDetailsComponent],
    exports: [HoldDetailsComponent]
})
export class HoldDetailsModule {}
