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

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { CategoryAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/category-autocomplete-field/category-autocomplete-field.module';
import { CountryAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/country-autocomplete-field';
import { PaymentInstitutionAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/payment-institution-autocomplete-field';
import { ShopDetailsFormModule } from '@dsh/app/shared/components/shop-creation/shop-details-form';
import { CountryCodesModule } from '@dsh/app/shared/services';
import { ButtonModule } from '@dsh/components/buttons';

import { PayoutToolFormComponent } from './components/payout-tool-form/payout-tool-form.component';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { CreateInternationalShopEntityComponent } from './create-international-shop-entity.component';
import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalPayoutToolFormService } from './services/international-payout-tool-form/international-payout-tool-form.service';
import { InternationalShopFormControllerService } from './services/international-shop-form-controller/international-shop-form-controller.service';

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
        PaymentInstitutionAutocompleteFieldModule,
        MatSelectModule,
        ShopDetailsFormModule,
    ],
    declarations: [CreateInternationalShopEntityComponent, PayoutToolFormComponent, ShopFormComponent],
    exports: [CreateInternationalShopEntityComponent],
    providers: [
        CreateInternationalShopEntityService,
        InternationalPayoutToolFormService,
        InternationalShopFormControllerService,
    ],
})
export class CreateInternationalShopEntityModule {}
