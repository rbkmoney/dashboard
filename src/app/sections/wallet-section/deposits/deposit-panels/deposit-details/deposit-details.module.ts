import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, ApiModelTypesModule, ToMajorModule } from '@dsh/app/shared';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DepositDetailsComponent } from './deposit-details.component';

@NgModule({
    imports: [
        TranslocoModule,
        FlexModule,
        CommonModule,
        StatusModule,
        LayoutModule,
        ApiModelRefsModule,
        ApiModelTypesModule,
        ToMajorModule,
    ],
    declarations: [DepositDetailsComponent],
    exports: [DepositDetailsComponent],
})
export class DepositDetailsModule {}
