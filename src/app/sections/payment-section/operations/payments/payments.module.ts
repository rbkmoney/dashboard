import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { NotificationModule } from '@dsh/app/shared/services';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';

import { DEBOUNCE_ACTION_TIME, DEFAULT_DEBOUNCE_ACTION_TIME } from './consts';
import { PaymentsFiltersModule } from './payments-filters';
import { PaymentsPanelsModule } from './payments-panels';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        PaymentsFiltersModule,
        LastUpdatedModule,
        PaymentsPanelsModule,
        FlexLayoutModule,
        NotificationModule,
    ],
    declarations: [PaymentsComponent],
    providers: [
        {
            provide: DEBOUNCE_ACTION_TIME,
            useValue: DEFAULT_DEBOUNCE_ACTION_TIME,
        },
        { provide: TRANSLOCO_SCOPE, useValue: 'main' },
        { provide: SEARCH_LIMIT, useValue: 5 },
    ],
})
export class PaymentsModule {}
