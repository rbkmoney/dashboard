import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceStatusColorPipe } from './invoice-status-color.pipe';
import { InvoiceStatusNamePipe } from './invoice-status-name.pipe';

@NgModule({
    imports: [TranslocoModule, LayoutModule, FlexLayoutModule, CommonModule, StatusModule, ToMajorModule],
    declarations: [InvoiceDetailsComponent, InvoiceStatusColorPipe, InvoiceStatusNamePipe],
    exports: [InvoiceDetailsComponent, InvoiceStatusColorPipe, InvoiceStatusNamePipe],
})
export class InvoiceDetailsModule {}
