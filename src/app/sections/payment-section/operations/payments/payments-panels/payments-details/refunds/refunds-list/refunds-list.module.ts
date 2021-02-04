import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { RefundDetailsModule } from '@dsh/app/shared/components';
import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { HeadlineModule } from '@dsh/components/layout';

import { RefundsListComponent } from './refunds-list.component';

@NgModule({
    imports: [
        CommonModule,
        RefundDetailsModule,
        MatDividerModule,
        FlexLayoutModule,
        TranslocoModule,
        ButtonModule,
        HeadlineModule,
        SpinnerModule,
    ],
    declarations: [RefundsListComponent],
    exports: [RefundsListComponent],
})
export class RefundsListModule {}
