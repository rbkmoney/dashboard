import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { ErrorMessageModule, PayoutToolDetailsModule } from '@dsh/app/shared';
import { ShopFieldModule } from '@dsh/app/shared/components/inputs/shop-field';

import { ExistingBankAccountComponent } from './existing-bank-account.component';

@NgModule({
    imports: [
        TranslocoModule,
        FlexModule,
        ShopFieldModule,
        ReactiveFormsModule,
        CommonModule,
        PayoutToolDetailsModule,
        ErrorMessageModule,
    ],
    declarations: [ExistingBankAccountComponent],
    exports: [ExistingBankAccountComponent],
})
export class ExistingBankAccountModule {}
