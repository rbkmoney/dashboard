import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { RefundStatusFieldModule } from '@dsh/app/shared/components/inputs/refund-status-field/refund-status-field.module';
import { FilterModule } from '@dsh/components/filter';

import { RefundStatusFilterComponent } from './refund-status-filter.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        MatRadioModule,
        FilterModule,
        RefundStatusFieldModule,
        ReactiveFormsModule,
    ],
    declarations: [RefundStatusFilterComponent],
    exports: [RefundStatusFilterComponent],
})
export class RefundStatusFilterModule {}
