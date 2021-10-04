import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { DialogFiltersComponent } from './components';
import { InvoicesFilterModule } from './invoices-filter';
import { RefundStatusFilterModule } from './refund-status-filter';
import { ShopsFilterModule } from './shops-filter';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatIconModule,
        RefundStatusFilterModule,
        MatDividerModule,
        InvoicesFilterModule,
        ShopsFilterModule,
    ],
    declarations: [DialogFiltersComponent],
})
export class AdditionalFiltersModule {}
