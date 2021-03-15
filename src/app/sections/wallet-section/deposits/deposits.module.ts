import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { DepositsModule as DepositsApiModule } from '@dsh/api/deposits';
import { ToMajorModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { RangeDatepickerModule } from '@dsh/components/form-controls';
import { SpinnerModule } from '@dsh/components/indicators';
import { DetailsItemModule, ExpandPanelModule, FloatPanelModule, JustifyWrapperModule } from '@dsh/components/layout';
import { DepositInfoModule } from '@dsh/components/layout/deposit-info';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { InvoiceDetailsModule } from '../../invoice-details';
import { UtilsModule } from '../../payment-details/utils';
import { WalletSectionModule } from '../wallet-section.module';
import { DepositsListModule } from './deposits-list';
import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { SearchFormComponent } from './search-form';

@NgModule({
    imports: [
        DepositsRoutingModule,
        CommonModule,
        FloatPanelModule,
        TranslocoModule,
        ReactiveFormsModule,
        JustifyWrapperModule,
        RangeDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        ButtonModule,
        MatInputModule,
        FlexModule,
        DepositsApiModule,
        ExpandPanelModule,
        DetailsItemModule,
        ToMajorModule,
        UtilsModule,
        ShowMorePanelModule,
        SpinnerModule,
        ScrollUpModule,
        InvoiceDetailsModule,
        WalletSectionModule,
        DepositInfoModule,
        DepositsListModule,
    ],
    declarations: [DepositsComponent, SearchFormComponent],
})
export class DepositsModule {}
