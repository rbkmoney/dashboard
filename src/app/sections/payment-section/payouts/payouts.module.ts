import { NgModule } from '@angular/core';
import {
    MatCommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
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
import { SearchModule } from '../../../api';
import { PayoutPanelModule } from './payout-panel';
import { SpinnerModule } from '../../../spinner';
import { ScrollUpModule } from '../../../scroll-up';
import { RangeDatepickerModule } from '../../../form-controls';

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
