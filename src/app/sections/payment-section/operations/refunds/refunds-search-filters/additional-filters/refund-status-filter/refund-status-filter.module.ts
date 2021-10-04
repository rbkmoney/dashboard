import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { InlineShowAllToggleModule } from '@dsh/app/shared/components/buttons/inline-show-all-toggle';
import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';

import { RefundStatusFilterComponent } from './refund-status-filter.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatRadioModule,
        InlineShowAllToggleModule,
        ExpandableRadioGroupModule,
    ],
    declarations: [RefundStatusFilterComponent],
    exports: [RefundStatusFilterComponent],
})
export class RefundStatusFilterModule {}
