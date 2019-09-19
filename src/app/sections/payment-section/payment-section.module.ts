import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentSectionComponent } from './payment-section.component';
import { PaymentSectionRoutingModule } from './payment-section-routing.module';
import { NavComponent } from './nav';
import { StateNavModule } from '../../state-nav';
import { LocaleModule } from '../../locale';

@NgModule({
    imports: [
        CommonModule,
        PaymentSectionRoutingModule,
        StateNavModule,
        MatIconModule,
        FlexLayoutModule,
        LocaleModule,
        TranslocoModule
    ],
    declarations: [PaymentSectionComponent, NavComponent],
    exports: [PaymentSectionComponent]
})
export class PaymentSectionModule {}
