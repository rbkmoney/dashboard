import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { PayoutsModule } from '@dsh/api/payouts';
import { ActionsModule } from '@dsh/app/shared/components/actions';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ShopCreationService } from '@dsh/app/shared/components/shop-creation/shop-creation.service';
import { ShopContractDetailsModule } from '@dsh/app/shared/services/shop-contract-details';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateShopDialogComponent } from './components';
import { CreateInternationalShopEntityModule } from './create-international-shop-entity';
import { CreateRussianShopEntityModule } from './create-russian-shop-entity';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TranslocoModule,
        MatDialogModule,
        FlexLayoutModule,
        MatRadioModule,
        CreateRussianShopEntityModule,
        CreateInternationalShopEntityModule,
        PayoutsModule,
        BaseDialogModule,
        ShopContractDetailsModule,
        ActionsModule,
    ],
    declarations: [CreateShopDialogComponent],
    providers: [ShopCreationService],
})
export class ShopCreationModule {}
