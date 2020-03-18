import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule, MatSnackBarModule } from '@angular/material';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { FormControlsModule, RangeDatepickerModule } from '@dsh/components/form-controls';

import { ButtonModule } from '../../../../button';
import { FromMinorModule } from '../../../../from-minor';
import { LayoutModule } from '../../../../layout';
import { SpinnerModule } from '../../../../spinner';
import { StateNavModule } from '../../../../state-nav';
import { StatusModule } from '../../../../status';
import { TableModule } from '../../../../table';
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
        StatusModule,
        FromMinorModule,
        LastUpdatedModule,
        SpinnerModule,
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
