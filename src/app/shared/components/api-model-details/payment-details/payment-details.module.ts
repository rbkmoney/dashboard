import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { LayoutModule } from '@dsh/components/layout';

import { PaymentStatusColorPipe } from './payment-status-color.pipe';
import { PaymentStatusNamePipe } from './payment-status-name.pipe';
import { PaymentDetailsComponent } from './payment-details.component';
import { StatusModule } from '@dsh/components/indicators';
import { ToMajorModule } from '../../../../to-major';

@NgModule({
    imports: [TranslocoModule, LayoutModule, FlexLayoutModule, CommonModule, StatusModule, ToMajorModule],
    declarations: [PaymentDetailsComponent, PaymentStatusColorPipe, PaymentStatusNamePipe],
    exports: [PaymentDetailsComponent, PaymentStatusColorPipe, PaymentStatusNamePipe],
})
export class PaymentDetailsModule {}
