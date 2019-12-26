import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { CreateRefundComponent } from './create-refund';
import { RefundsComponent } from './refunds.component';
import { RefundItemComponent } from './refund-item';
import { FromMinorModule } from '../../../from-minor';
import { ButtonModule } from '../../../button';
import { DetailsItemModule } from '../../../details-item';
import { LayoutModule } from '../../../layout';
import { StatusDetailsItemModule } from '../status-details-item';
import { RefundSearchService } from '../../../api/search';
import { RefundService } from '../../../api/refund';
import { ShopService } from '../../../api/shop';
import { AccountService } from '../../../api/account';

@NgModule({
    imports: [
        FlexModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        FromMinorModule,
        MatDialogModule,
        ButtonModule,
        MatInputModule,
        DetailsItemModule,
        LayoutModule,
        StatusDetailsItemModule,
        TranslocoModule
    ],
    declarations: [CreateRefundComponent, RefundsComponent, RefundItemComponent],
    exports: [RefundsComponent],
    providers: [RefundSearchService, RefundService, ShopService, AccountService],
    entryComponents: [CreateRefundComponent]
})
export class RefundsModule {}
