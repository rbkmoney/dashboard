import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ContractDetailsModule, PayoutToolModule } from '@dsh/app/shared/components';
import { ButtonModule } from '@dsh/components/buttons';
import { DetailsItemModule } from '@dsh/components/layout';

import { CategoriesModule } from '../../../../../../api/categories';
import { ContractsModule } from '../../../../../../api/contracts';
import { ShopBalanceModule } from '../shop-balance';
import { CategoryService } from './category.service';
import { ShopActionsComponent } from './shop-actions';
import { ShopContractDetailsComponent } from './shop-contract-details';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopIdComponent } from './shop-id';
import { ShopInfoComponent } from './shop-info';
import { ShopPayoutToolDetailsComponent } from './shop-payout-tool-details';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        MatDividerModule,
        DetailsItemModule,
        ClipboardModule,
        ContractDetailsModule,
        PayoutToolModule,
        ShopBalanceModule,
        CategoriesModule,
        ContractsModule,
    ],
    declarations: [
        ShopDetailsComponent,
        ShopContractDetailsComponent,
        ShopPayoutToolDetailsComponent,
        ShopActionsComponent,
        ShopIdComponent,
        ShopInfoComponent,
    ],
    exports: [ShopDetailsComponent],
    providers: [CategoryService],
})
export class ShopDetailsModule {}
