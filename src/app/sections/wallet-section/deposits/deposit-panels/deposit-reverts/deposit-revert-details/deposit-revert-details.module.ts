import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, ToMajorModule } from '@dsh/app/shared';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DepositRevertDetailsComponent } from './deposit-revert-details.component';
import { DepositRevertStatusColorPipe, DepositRevertStatusNamePipe } from './pipes';

@NgModule({
    imports: [
        TranslocoModule,
        ToMajorModule,
        FlexModule,
        CommonModule,
        StatusModule,
        ApiModelRefsModule,
        LayoutModule,
        ToMajorModule,
    ],
    declarations: [DepositRevertDetailsComponent, DepositRevertStatusColorPipe, DepositRevertStatusNamePipe],
    exports: [DepositRevertDetailsComponent, DepositRevertStatusColorPipe, DepositRevertStatusNamePipe],
})
export class DepositRevertDetailsModule {}
