import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimsModule } from '@dsh/api/claims';
import { PayoutToolDetailsModule } from '@dsh/app/shared/components';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ShopFieldModule } from '@dsh/app/shared/components/inputs/shop-field';
import { ButtonModule } from '@dsh/components/buttons';
import { FormatInputModule } from '@dsh/components/form-controls';
import { DetailsItemModule } from '@dsh/components/layout';

import { DaDataModule } from '../../../../dadata';
import { ShopPayoutToolDetailsService } from '../../../../sections/payment-section/integrations/shops/services/shop-payout-tool-details/shop-payout-tool-details.service';
import { ExistingBankAccountComponent } from './components/existing-bank-account/existing-bank-account.component';
import { NewBankAccountComponent } from './components/new-bank-account/new-bank-account.component';
import { ShopContractComponent } from './components/shop-contract/shop-contract.component';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { CreateRussianShopEntityComponent } from './create-russian-shop-entity.component';
import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatRadioModule,
        DaDataModule,
        FormatInputModule,
        MatSelectModule,
        PayoutToolDetailsModule,
        ButtonModule,
        DetailsItemModule,
        ClaimsModule,
        BaseDialogModule,
        ShopFieldModule,
    ],
    declarations: [
        CreateRussianShopEntityComponent,
        ShopContractComponent,
        ShopFormComponent,
        ExistingBankAccountComponent,
        NewBankAccountComponent,
    ],
    exports: [CreateRussianShopEntityComponent],
    providers: [CreateRussianShopEntityService, ShopPayoutToolDetailsService],
})
export class CreateRussianShopEntityModule {}
