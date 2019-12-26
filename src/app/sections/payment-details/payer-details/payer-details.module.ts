import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule } from '../../../layout/card';
import { ButtonModule } from '../../../button';
import { PayerDetailsComponent } from './payer-details.component';
import { CustomerPayerComponent } from './customer-payer';
import { PaymentResourcePayerComponent } from './payment-resource-payer';
import { DetailsItemModule } from '../../../details-item';

@NgModule({
    imports: [TranslocoModule, CardModule, FlexModule, ButtonModule, DetailsItemModule, CommonModule],
    declarations: [PayerDetailsComponent, CustomerPayerComponent, PaymentResourcePayerComponent],
    exports: [PayerDetailsComponent]
})
export class PayerDetailsModule {}
