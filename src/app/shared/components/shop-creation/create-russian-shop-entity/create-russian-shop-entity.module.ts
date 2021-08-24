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
import { ShopDetailsFormModule } from '@dsh/app/shared/components/shop-creation/shop-details-form/shop-details-form.module';
import { ButtonModule } from '@dsh/components/buttons';
import { FormatInputModule } from '@dsh/components/form-controls';
import { DetailsItemModule } from '@dsh/components/layout';

import { KonturFocusModule } from '../../../../api';
import { DaDataModule } from '../../../../dadata';
import { ShopPayoutToolDetailsService } from '../../../../sections/payment-section/integrations/shops/services/shop-payout-tool-details/shop-payout-tool-details.service';
import { ExistingBankAccountComponent } from './components/existing-bank-account/existing-bank-account.component';
import { OrgDetailsFormComponent } from './components/org-details-form/org-details-form.component';
import { RussianBankAccountFormComponent } from './components/russian-bank-account/russian-bank-account-form.component';
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
        ShopDetailsFormModule,
        KonturFocusModule,
    ],
    declarations: [
        CreateRussianShopEntityComponent,
        OrgDetailsFormComponent,
        ShopFormComponent,
        ExistingBankAccountComponent,
        RussianBankAccountFormComponent,
    ],
    exports: [CreateRussianShopEntityComponent],
    providers: [CreateRussianShopEntityService, ShopPayoutToolDetailsService],
})
export class CreateRussianShopEntityModule {}
