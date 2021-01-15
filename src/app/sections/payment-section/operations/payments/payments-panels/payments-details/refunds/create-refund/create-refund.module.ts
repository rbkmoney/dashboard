import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { AccountModule } from '@dsh/api/account';
import { RefundModule } from '@dsh/api/refund';
import { ToMajorModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { FormatInputModule } from '@dsh/components/form-controls';
import { HeadlineModule } from '@dsh/components/layout';

import { CreateRefundDialogComponent } from './components/create-refund-dialog/create-refund-dialog.component';
import { CreateRefundService } from './create-refund.service';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        ButtonModule,
        TranslocoModule,
        ToMajorModule,
        FormatInputModule,
        AccountModule,
        RefundModule,
        HeadlineModule,
    ],
    declarations: [CreateRefundDialogComponent],
    providers: [CreateRefundService],
})
export class CreateRefundModule {}
