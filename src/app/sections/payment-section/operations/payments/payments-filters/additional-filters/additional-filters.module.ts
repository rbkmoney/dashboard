import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { CardFilterModule } from './card-filter';
import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { InvoicesFilterModule } from './invoices-filter';
import { MainFiltersModule } from './main-filters';
import { PaymentStatusFilterModule } from './payment-status-filter';
import { PaymentSumFilterModule } from './payment-sum-filter';
import { PaymentSystemFilterModule } from './payment-system-filter/payment-system-filter.module';
import { ShopsFilterModule } from './shops-filter';
import { TokenProviderFilterModule } from './token-provider-filter/token-provider-filter.module';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatIconModule,
        MainFiltersModule,
        PaymentStatusFilterModule,
        MatDividerModule,
        PaymentSumFilterModule,
        TokenProviderFilterModule,
        PaymentSystemFilterModule,
        InvoicesFilterModule,
        ShopsFilterModule,
        CardFilterModule,
    ],
    declarations: [DialogFiltersComponent],
})
export class AdditionalFiltersModule {}
