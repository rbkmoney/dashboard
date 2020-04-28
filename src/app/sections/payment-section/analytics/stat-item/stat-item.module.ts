import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { FromMinorModule } from '../../../../from-minor';
import { PercentDifferenceModule } from '../percent-difference';
import { StatItemComponent } from './stat-item.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        CardModule,
        SpinnerModule,
        TranslocoModule,
        PercentDifferenceModule,
        FromMinorModule
    ],
    declarations: [StatItemComponent],
    exports: [StatItemComponent]
})
export class StatItemModule {}
