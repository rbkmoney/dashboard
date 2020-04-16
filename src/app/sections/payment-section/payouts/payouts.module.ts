import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { RangeDatepickerModule } from '@dsh/components/form-controls';
import { SpinnerModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';

import { SearchModule } from '../../../api';
import { PayoutPanelModule } from './payouts-panels-list';
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
