import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatDatepickerModule, MatSelectModule } from '@angular/material';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { SearchFormComponent } from './search-form';

@NgModule({
    imports: [
        TranslocoModule,
        ReportsRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule
    ],
    declarations: [ReportsComponent, SearchFormComponent],
    exports: [ReportsComponent]
})
export class ReportsModule {}
