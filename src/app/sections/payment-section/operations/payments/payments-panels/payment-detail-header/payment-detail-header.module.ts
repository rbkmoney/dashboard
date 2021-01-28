import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentDetailHeaderComponent } from './payment-detail-header.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FlexLayoutModule],
    declarations: [PaymentDetailHeaderComponent],
    exports: [PaymentDetailHeaderComponent],
})
export class PaymentDetailHeaderModule {}
