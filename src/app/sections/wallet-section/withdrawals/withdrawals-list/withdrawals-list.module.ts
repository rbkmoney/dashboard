import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, ToMajorModule } from '@dsh/app/shared';
import { StatusModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { LayoutModule } from '@dsh/components/layout';

import { WithdrawalDetailsComponent } from './components/withdrawal-details/withdrawal-details.component';
import { WithdrawalRowHeaderComponent } from './components/withdrawal-row-header/withdrawal-row-header.component';
import { WithdrawalRowComponent } from './components/withdrawal-row/withdrawal-row.component';
import { WithdrawalStatusColorPipe } from './pipes/withdrawal-status-color.pipe';
import { WithdrawalStatusNamePipe } from './pipes/withdrawal-status-name.pipe';
import { WithdrawalsListComponent } from './withdrawals-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        ToMajorModule,
        LastUpdatedModule,
        ApiModelRefsModule,
        StatusModule,
    ],
    declarations: [
        WithdrawalsListComponent,
        WithdrawalRowHeaderComponent,
        WithdrawalRowComponent,
        WithdrawalDetailsComponent,
        WithdrawalStatusColorPipe,
        WithdrawalStatusNamePipe,
    ],
    exports: [WithdrawalsListComponent],
})
export class WithdrawalsListModule {}
