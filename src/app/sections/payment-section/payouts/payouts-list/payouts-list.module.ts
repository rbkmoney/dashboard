import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, ApiModelTypesModule } from '@dsh/app/shared/*';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ToMajorModule } from '../../../../to-major';
import { PayoutsDetailsModule } from '../payouts-details';
import { PayoutRowComponent } from './payout-row';
import { PayoutRowHeaderComponent } from './payout-row-header';
import { PayoutsListComponent } from './payouts-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        PayoutsDetailsModule,
        ToMajorModule,
        ApiModelTypesModule,
        ApiModelRefsModule,
    ],
    declarations: [PayoutsListComponent, PayoutRowHeaderComponent, PayoutRowComponent],
    exports: [PayoutsListComponent],
})
export class PayoutsListModule {}
