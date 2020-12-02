import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { PayoutsModule } from '@dsh/api/payouts';
import { QuestionaryModule } from '@dsh/api/questionary';
import { ButtonModule } from '@dsh/components/buttons';

import { DaDataModule } from '../../../../../dadata';
import { ClaimsModule } from '../../../../claims';
import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { CreateInternationalShopEntityModule } from './create-international-shop-entity';
import { CreateRussianShopEntityModule } from './create-russian-shop-entity';
import { ShopCreationService } from './shop-creation.service';

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
        DaDataModule,
        QuestionaryModule,
        ClaimsModule,
    ],
    declarations: [CreateShopDialogComponent],
    providers: [ShopCreationService],
})
export class ShopCreationModule {}
