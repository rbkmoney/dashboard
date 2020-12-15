import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { RefundDetailsComponent } from './refund-details.component';
import { RefundStatusColorPipe } from './refund-status-color.pipe';
import { RefundStatusNamePipe } from './refund-status-name.pipe';

@NgModule({
    imports: [TranslocoModule, LayoutModule, FlexLayoutModule, CommonModule, StatusModule, ToMajorModule],
    declarations: [RefundDetailsComponent, RefundStatusColorPipe, RefundStatusNamePipe],
    exports: [RefundDetailsComponent, RefundStatusColorPipe, RefundStatusNamePipe],
})
export class RefundDetailsModule {}
