import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { StatusModule } from '@dsh/components/indicators';

import { PaymentStatusComponent } from './payment-status.component';
import { PaymentStatusColorPipe } from './pipes/status-color/status-color.pipe';

@NgModule({
    imports: [CommonModule, StatusModule, TranslocoModule],
    declarations: [PaymentStatusComponent, PaymentStatusColorPipe],
    exports: [PaymentStatusComponent, PaymentStatusColorPipe],
})
export class PaymentStatusModule {}
