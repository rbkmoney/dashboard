import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '../../layout';
import { PaymentDetailsComponent } from './payment-details.component';
import { StatusModule } from '../../status';
import { DetailsHeadlineComponent } from './details-headline/details-headline.component';
import { LocaleModule } from '../../locale';
import { SecondaryTitleDirective } from './secondary-title.directive';
import { DetailsComponent } from './details/details.component';
import { CardModule } from '../../layout/card';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { StatusItemComponent } from './detail-item/status-item/status-item.component';
import { FormatTimePipe } from './format-time.pipe';
import { PaymentToolComponent } from './payment-tool/payment-tool.component';

@NgModule({
    imports: [LayoutModule, StatusModule, MatIconModule, LocaleModule, FlexLayoutModule, RouterModule, CardModule],
    declarations: [
        PaymentDetailsComponent,
        DetailsHeadlineComponent,
        SecondaryTitleDirective,
        DetailsComponent,
        DetailItemComponent,
        StatusItemComponent,
        FormatTimePipe,
        PaymentToolComponent,
    ],
    exports: [PaymentDetailsComponent]
})
export class PaymentDetailsModule {}
