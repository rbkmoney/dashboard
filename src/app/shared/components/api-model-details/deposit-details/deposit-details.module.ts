import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ApiModelRefsModule, ToMajorModule } from '../../../pipes';
import { DepositDetailsComponent } from './deposit-details.component';
import { DepositStatusColorPipe, DepositStatusNamePipe } from './pipes';

@NgModule({
    imports: [TranslocoModule, ToMajorModule, FlexModule, CommonModule, StatusModule, ApiModelRefsModule, LayoutModule],
    declarations: [DepositDetailsComponent, DepositStatusColorPipe, DepositStatusNamePipe],
    exports: [DepositDetailsComponent, DepositStatusColorPipe, DepositStatusNamePipe],
})
export class DepositDetailsModule {}
