import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { RefundDetailsModule } from '@dsh/app/shared/components';
import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';

import { RefundsListComponent } from './refunds-list.component';

@NgModule({
    imports: [
        CommonModule,
        RefundDetailsModule,
        MatDividerModule,
        FlexLayoutModule,
        TranslocoModule,
        ButtonModule,
        SpinnerModule,
        RouterModule,
        MatIconModule,
    ],
    declarations: [RefundsListComponent],
    exports: [RefundsListComponent],
})
export class RefundsListModule {}
