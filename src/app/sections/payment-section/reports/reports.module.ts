import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
    imports: [TranslocoModule, ReportsRoutingModule],
    declarations: [ReportsComponent],
    exports: [ReportsComponent]
})
export class ReportsModule {}
