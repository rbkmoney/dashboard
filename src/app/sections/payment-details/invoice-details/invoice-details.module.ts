import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule } from '../../../layout/card';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { StatusDetailsItemModule } from '../status-details-item';
import { FromMinorModule } from '../../../from-minor';
import { LayoutModule } from '../../../layout';
import { SpinnerModule } from '../../../spinner';
import { DetailsItemModule } from '../../../details-item';
import { InvoiceSearchService } from '../../../api/search';

@NgModule({
    imports: [
        TranslocoModule,
        CardModule,
        FlexModule,
        StatusDetailsItemModule,
        MatIconModule,
        FromMinorModule,
        CommonModule,
        LayoutModule,
        SpinnerModule,
        DetailsItemModule
    ],
    declarations: [InvoiceDetailsComponent],
    exports: [InvoiceDetailsComponent],
    providers: [InvoiceSearchService]
})
export class InvoiceDetailsModule {}
