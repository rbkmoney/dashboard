import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule, RangeDatepickerModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { TableModule } from '@dsh/components/table';

import { FromMinorModule } from '../../../../from-minor';
import { EmptySearchResultModule } from '../../empty-search-result';
import { LastUpdatedModule } from '../last-updated/last-updated.module';
import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsComponent } from './refunds.component';
import { SearchFormComponent } from './search-form';
import { RefundStatusColorPipe } from './status-color.pipe';
import { TableComponent } from './table';

@NgModule({
    imports: [
        CommonModule,
        RefundsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TableModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormControlsModule,
        IndicatorsModule,
        FromMinorModule,
        LastUpdatedModule,
        MatSnackBarModule,
        TranslocoModule,
        StateNavModule,
        MatMenuModule,
        RangeDatepickerModule,
        EmptySearchResultModule
    ],
    declarations: [RefundsComponent, SearchFormComponent, RefundStatusColorPipe, TableComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class RefundsModule {}
