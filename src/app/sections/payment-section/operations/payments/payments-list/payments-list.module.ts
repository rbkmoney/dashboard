import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';

import { DEBOUNCE_ACTION_TIME, DEFAULT_DEBOUNCE_ACTION_TIME } from './consts';
import { PaymentsFiltersModule } from './payments-filters';
import { PaymentsListComponent } from './payments-list.component';
import { PaymentsPanelsModule } from './payments-panels';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';

@NgModule({
    imports: [CommonModule, PaymentsFiltersModule, LastUpdatedModule, PaymentsPanelsModule, FlexLayoutModule],
    declarations: [PaymentsListComponent],
    providers: [
        FetchPaymentsService,
        {
            provide: DEBOUNCE_ACTION_TIME,
            useValue: DEFAULT_DEBOUNCE_ACTION_TIME,
        },
    ],
    exports: [PaymentsListComponent],
})
export class PaymentsListModule {}
