import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { QuestionaryModule } from '@dsh/api/questionary';
import { CountryCodesModule } from '@dsh/app/shared/services';
import { ButtonModule } from '@dsh/components/buttons';

import { PayoutToolFormComponent } from './components/payout-tool-form/payout-tool-form.component';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { CreateInternationalShopEntityComponent } from './create-international-shop-entity.component';
import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalPayoutToolFormService } from './services/international-payout-tool-form/international-payout-tool-form.service';
import { InternationalShopFormControllerService } from './services/international-shop-form-controller/international-shop-form-controller.service';

// TODO: refactor this module
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
        MatDialogModule,
        QuestionaryModule,
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
