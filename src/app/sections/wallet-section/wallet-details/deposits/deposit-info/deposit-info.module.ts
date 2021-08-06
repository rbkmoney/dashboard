import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { DetailsItemModule } from '@dsh/components/layout';

import { DepositInfoComponent } from './deposit-info.component';
import { StatusToColorPipe } from './status-to-color.pipe';

@NgModule({
    imports: [CommonModule, FlexModule, DetailsItemModule, ToMajorModule, TranslocoModule],
    declarations: [DepositInfoComponent, StatusToColorPipe],
    exports: [DepositInfoComponent],
})
export class DepositInfoModule {}