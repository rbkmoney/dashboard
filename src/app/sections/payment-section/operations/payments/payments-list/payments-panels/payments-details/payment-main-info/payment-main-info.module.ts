import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';

import { PaymentMainInfoComponent } from './payment-main-info.component';

@NgModule({
    declarations: [PaymentMainInfoComponent],
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, DetailsItemModule, StatusModule, ToMajorModule],
})
export class PaymentMainInfoModule {}
