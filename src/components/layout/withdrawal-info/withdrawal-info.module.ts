import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { DetailsItemModule } from '@dsh/components/layout';

import { StatusDetailsItemModule } from '../../../app/sections/payment-details/status-details-item';
import { ToMajorModule } from '../../../app/to-major';
import { StatusToColorPipe } from './status-to-color.pipe';
import { WithdrawalInfoComponent } from './withdrawal-info.component';

@NgModule({
    imports: [CommonModule, FlexModule, StatusDetailsItemModule, DetailsItemModule, ToMajorModule, TranslocoModule],
    declarations: [WithdrawalInfoComponent, StatusToColorPipe],
    exports: [WithdrawalInfoComponent],
})
export class WithdrawalInfoModule {}
