import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';

@NgModule({
    imports: [TranslocoModule, ReportsRoutingModule, LayoutModule, ButtonModule, FlexLayoutModule],
    declarations: [ReportsComponent],
    exports: [ReportsComponent]
})
export class ReportsModule {}
