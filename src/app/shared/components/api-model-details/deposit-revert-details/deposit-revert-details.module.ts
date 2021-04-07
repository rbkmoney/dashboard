import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ApiModelRefsModule, ToMajorModule } from '../../../pipes';
import { DepositRevertDetailsComponent } from './deposit-revert-details.component';
import { DepositRevertStatusColorPipe, DepositRevertStatusNamePipe } from './pipes';

@NgModule({
    imports: [TranslocoModule, ToMajorModule, FlexModule, CommonModule, StatusModule, ApiModelRefsModule, LayoutModule],
    declarations: [DepositRevertDetailsComponent, DepositRevertStatusColorPipe, DepositRevertStatusNamePipe],
    exports: [DepositRevertDetailsComponent, DepositRevertStatusColorPipe, DepositRevertStatusNamePipe],
})
export class DepositRevertDetailsModule {}
