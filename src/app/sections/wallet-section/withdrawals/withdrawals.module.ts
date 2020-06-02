import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { RangeDatepickerModule } from '@dsh/components/form-controls';
import { SpinnerModule } from '@dsh/components/indicators';
import { DetailsItemModule, ExpandPanelModule, FloatPanelModule, JustifyWrapperModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { WithdrawalsModule as WithdrawalsApiModule } from '../../../api';
import { ToMajorModule } from '../../../to-major';
import { InvoiceDetailsModule } from '../../invoice-details';
import { UtilsModule } from '../../payment-details/utils';
import { WalletSectionModule } from '../wallet-section.module';
import { SearchFormComponent } from './search-form';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';
import { WithdrawalsRoutingModule } from './withdrawals-routing.module';
import { WithdrawalsComponent } from './withdrawals.component';

@NgModule({
    imports: [
        WithdrawalsRoutingModule,
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
        WithdrawalsApiModule,
        ExpandPanelModule,
        DetailsItemModule,
        ToMajorModule,
        UtilsModule,
        ShowMorePanelModule,
        SpinnerModule,
        ScrollUpModule,
        InvoiceDetailsModule,
        WalletSectionModule,
    ],
    declarations: [WithdrawalsComponent, SearchFormComponent, WithdrawalListComponent],
})
export class WithdrawalsModule {}
