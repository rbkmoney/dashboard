import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { SearchFormComponent } from './search-form';
import { TableComponent } from './table';
import { TableModule } from '../../../table';
import { StateNavModule } from '../../../state-nav';
import { DropdownModule } from '../../../dropdown';
import { ReportsService } from './reports.service';
import { ReportsModule as ReportsApiModule } from '../../../api';
import { StatusModule } from '../../../status';

@NgModule({
    imports: [
        TranslocoModule,
        ReportsRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        ReactiveFormsModule,
        TableModule,
        StateNavModule,
        DropdownModule,
        MatIconModule,
        TableModule,
        ReportsApiModule,
        CommonModule,
        StatusModule
    ],
    declarations: [ReportsComponent, SearchFormComponent, TableComponent],
    exports: [ReportsComponent],
    providers: [ReportsService]
})
export class ReportsModule {}
