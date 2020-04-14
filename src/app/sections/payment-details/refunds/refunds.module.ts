import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { DetailsItemModule, LayoutModule } from '@dsh/components/layout';

import { AccountService } from '../../../api/account';
import { RefundService } from '../../../api/refund';
import { RefundSearchService } from '../../../api/search';
import { ShopService } from '../../../api/shop';
import { FromMinorModule } from '../../../from-minor';
import { StatusDetailsItemModule } from '../status-details-item';
import { CreateRefundComponent } from './create-refund';
import { RefundItemComponent } from './refund-item';
import { RefundsComponent } from './refunds.component';

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
