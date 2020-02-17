import { NgModule } from '@angular/core';
import {
    MatCommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule
} from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PayoutsComponent } from './payouts.component';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { ButtonModule } from '../../../button';
import { SearchFormComponent } from './search-form';
import { LayoutModule } from '../../../layout';
import { DaterangeSelectorModule } from '../operations/daterange-selector';
import { SearchModule } from '../../../api';
import { PayoutPanelModule } from './payout-panel';

@NgModule({
    imports: [
        PayoutsRoutingModule,
        MatCommonModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        PayoutPanelModule,
        DaterangeSelectorModule,
        MatFormFieldModule,
        MatOptionModule,
        CommonModule,
        MatSelectModule,
        MatDatepickerModule,
        SearchModule,
        MatInputModule
    ],
    declarations: [PayoutsComponent, SearchFormComponent],
    exports: [PayoutsComponent]
})
export class PayoutsModule {}
