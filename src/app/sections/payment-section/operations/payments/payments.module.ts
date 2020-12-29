import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';

import { DEBOUNCE_ACTION_TIME, DEFAULT_DEBOUNCE_ACTION_TIME } from './consts';
import { PaymentsFiltersModule } from './payments-filters';
import { PaymentsPanelsModule } from './payments-panels';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';
import { PaymentsExpandedIdManager } from './services/payments-expanded-id-manager/payments-expanded-id-manager.service';

@NgModule({
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        PaymentsFiltersModule,
        LastUpdatedModule,
        PaymentsPanelsModule,
        FlexLayoutModule,
    ],
    declarations: [PaymentsComponent],
    providers: [
        FetchPaymentsService,
        PaymentsExpandedIdManager,
        {
            provide: DEBOUNCE_ACTION_TIME,
            useValue: DEFAULT_DEBOUNCE_ACTION_TIME,
        },
        { provide: TRANSLOCO_SCOPE, useValue: 'main' },
    ],
})
export class PaymentsModule {}
