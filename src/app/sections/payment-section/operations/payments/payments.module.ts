import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { TableModule } from '../../../../table';
import { ButtonToggleModule } from '../../../../button-toggle';
import { LocaleModule } from '../../../../locale/locale.module';

@NgModule({
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TableModule,
        ButtonToggleModule,
        MatIconModule,
        LocaleModule
    ],
    declarations: [PaymentsComponent]
})
export class PaymentsModule {}
