import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceSearchService } from '@dsh/api/search';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule, DetailsItemModule, LayoutModule } from '@dsh/components/layout';

import { ToMajorModule } from '../../../to-major';
import { StatusDetailsItemModule } from '../status-details-item';
import { InvoiceDetailsComponent } from './invoice-details.component';

@NgModule({
    imports: [
        TranslocoModule,
        CardModule,
        FlexModule,
        StatusDetailsItemModule,
        MatIconModule,
        ToMajorModule,
        CommonModule,
        LayoutModule,
        SpinnerModule,
        DetailsItemModule,
    ],
    declarations: [InvoiceDetailsComponent],
    exports: [InvoiceDetailsComponent],
    providers: [InvoiceSearchService],
})
export class InvoiceDetailsModule {}
