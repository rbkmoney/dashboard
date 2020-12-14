import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentDetailHeaderComponent } from './components/payment-detail-header/payment-detail-header.component';
import { PaymentDetailInfoComponent } from './components/payment-detail-info/payment-detail-info.component';

@NgModule({
    imports: [CommonModule, FlexModule, TranslocoModule],
    declarations: [PaymentDetailHeaderComponent, PaymentDetailInfoComponent],
    exports: [PaymentDetailHeaderComponent, PaymentDetailInfoComponent],
})
export class PaymentsDetailsModule {}
