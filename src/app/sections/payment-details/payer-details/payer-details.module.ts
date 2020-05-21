import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { CustomerPayerComponent } from './customer-payer';
import { PayerDetailsComponent } from './payer-details.component';
import { PaymentResourcePayerComponent } from './payment-resource-payer';

@NgModule({
    imports: [TranslocoModule, CardModule, FlexModule, ButtonModule, DetailsItemModule, CommonModule],
    declarations: [PayerDetailsComponent, CustomerPayerComponent, PaymentResourcePayerComponent],
    exports: [PayerDetailsComponent],
})
export class PayerDetailsModule {}
