import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, ToMajorModule, WithdrawalInfoModule } from '@dsh/app/shared';
import { LayoutModule } from '@dsh/components/layout';

import { WithdrawalRowHeaderComponent } from './components/withdrawal-row-header/withdrawal-row-header.component';
import { WithdrawalRowComponent } from './components/withdrawal-row/withdrawal-row.component';
import { WithdrawalsListComponent } from './withdrawals-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        WithdrawalInfoModule,
        ToMajorModule,
        ApiModelRefsModule,
    ],
    declarations: [WithdrawalsListComponent, WithdrawalRowHeaderComponent, WithdrawalRowComponent],
    exports: [WithdrawalsListComponent],
})
export class WithdrawalsListModule {}
