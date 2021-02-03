import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { InlineShowAllToggleModule } from '@dsh/app/shared/components/buttons/inline-show-all-toggle';
import { RadioGroupFilterModule } from '@dsh/components/filters/radio-group-filter';

import { PaymentStatusFilterComponent } from './components/payment-status-filter/payment-status-filter.component';
import { StatusFiltersComponent } from './status-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        RadioGroupFilterModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatRadioModule,
        InlineShowAllToggleModule,
    ],
    declarations: [StatusFiltersComponent, PaymentStatusFilterComponent],
    exports: [StatusFiltersComponent],
})
export class StatusFiltersModule {}
