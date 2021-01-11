import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CreateRefundModule } from './create-refund/create-refund.module';
import { RefundsComponent } from './refunds.component';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';

@NgModule({
    imports: [CommonModule, TranslocoModule, FlexLayoutModule, ButtonModule, CreateRefundModule],
    declarations: [RefundsComponent],
    exports: [RefundsComponent],
    providers: [FetchRefundsService],
})
export class RefundsModule {}
