import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CreateRefundModule } from './create-refund';
import { RefundsListModule } from './refunds-list';
import { RefundsComponent } from './refunds.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FlexLayoutModule, ButtonModule, CreateRefundModule, RefundsListModule],
    declarations: [RefundsComponent],
    exports: [RefundsComponent],
})
export class RefundsModule {}
