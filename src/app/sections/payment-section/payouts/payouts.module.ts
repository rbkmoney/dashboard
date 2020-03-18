import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
} from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { SearchModule } from '../../../api';
import { ButtonModule } from '../../../button';
import { RangeDatepickerModule } from '../../../form-controls';
import { LayoutModule } from '../../../layout';
import { ScrollUpModule } from '../../../scroll-up';
import { SpinnerModule } from '../../../spinner';
import { PayoutPanelModule } from './payout-panel';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { PayoutsComponent } from './payouts.component';
import { SearchFormComponent } from './search-form';

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
        MatFormFieldModule,
        MatOptionModule,
        CommonModule,
        MatSelectModule,
        SearchModule,
        MatInputModule,
        SpinnerModule,
        ScrollUpModule,
        RangeDatepickerModule
    ],
    declarations: [PayoutsComponent, SearchFormComponent],
    exports: [PayoutsComponent]
})
export class PayoutsModule {}
