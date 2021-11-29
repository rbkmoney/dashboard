import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ContractorDetailsModule, ErrorMessageModule } from '@dsh/app/shared';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { CategoryAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/category-autocomplete-field/category-autocomplete-field.module';
import { CountryAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/country-autocomplete-field';
import { PaymentInstitutionFieldModule } from '@dsh/app/shared/components/inputs/payment-institution-field';
import { ShopFieldModule } from '@dsh/app/shared/components/inputs/shop-field';
import { CreatedExistingSwitchModule } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.module';
import { ExistingBankAccountModule } from '@dsh/app/shared/components/shop-creation/existing-bank-account/existing-bank-account.module';
import { ExistingContractFormModule } from '@dsh/app/shared/components/shop-creation/existing-contract-form/existing-contract-form.module';
import { ShopDetailsFormModule } from '@dsh/app/shared/components/shop-creation/shop-details-form';
import { CountryCodesModule } from '@dsh/app/shared/services';
import { ButtonModule } from '@dsh/components/buttons';

import { CurrencyAutocompleteFieldModule } from '../../inputs/currency-autocomplete-field';
import {
    NewContractorFormComponent,
    PayoutToolFormComponent,
    ShopFormComponent,
    InternationalBankAccountFormComponent,
} from './components';
import { CreateInternationalShopEntityComponent } from './create-international-shop-entity.component';
import { CreateInternationalShopEntityService } from './services';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslocoModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatCheckboxModule,
        ButtonModule,
        CountryCodesModule,
        BaseDialogModule,
        CountryAutocompleteFieldModule,
        CategoryAutocompleteFieldModule,
        PaymentInstitutionFieldModule,
        MatSelectModule,
        ShopDetailsFormModule,
        CreatedExistingSwitchModule,
        ShopFieldModule,
        ContractorDetailsModule,
        ErrorMessageModule,
        ExistingContractFormModule,
        ExistingBankAccountModule,
        CurrencyAutocompleteFieldModule,
    ],
    declarations: [
        CreateInternationalShopEntityComponent,
        PayoutToolFormComponent,
        ShopFormComponent,
        NewContractorFormComponent,
        InternationalBankAccountFormComponent,
    ],
    exports: [CreateInternationalShopEntityComponent],
    providers: [CreateInternationalShopEntityService],
})
export class CreateInternationalShopEntityModule {}
