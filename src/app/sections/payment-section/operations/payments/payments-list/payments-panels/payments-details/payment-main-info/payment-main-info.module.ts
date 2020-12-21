import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { DetailsItemModule } from '@dsh/components/layout';
import { StatusModule } from '@dsh/components/indicators';
import { ToMajorModule } from '@dsh/app/shared/pipes';


@NgModule({
    declarations: [PaymentMainInfoComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        ToMajorModule
    ]
})
export class PaymentMainInfoModule {
}
