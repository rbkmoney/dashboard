import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { PayoutsModule } from '../../../../../api/payouts';
import { QuestionaryModule } from '../../../../../api/questionary';
import { DaDataModule } from '../../../../../dadata';
import { ClaimsModule } from '../../../../claims';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { CreateInternationalShopEntityModule } from './create-international-shop-entity';
import { CreateRussianShopEntityModule } from './create-russian-shop-entity';
import { CreateShopComponent } from './create-shop.component';

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
    declarations: [CreateButtonComponent, CreateShopDialogComponent, CreateShopComponent],
    exports: [CreateShopComponent],
})
export class CreateShopModule {}
