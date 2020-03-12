import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatMenuModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule } from '@angular/material';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsComponent } from './refunds.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { TableModule } from '../../../../table';
import { SearchFormComponent } from './search-form';
import { FormControlsModule, RangeDatepickerModule } from '../../../../form-controls';
import { StatusModule } from '../../../../status';
import { RefundStatusColorPipe } from './status-color.pipe';
import { FromMinorModule } from '../../../../from-minor';
import { LastUpdatedModule } from '../last-updated/last-updated.module';
import { TableComponent } from './table';
import { SpinnerModule } from '../../../../spinner';
import { StateNavModule } from '../../../../state-nav';
import { EmptyModule } from '../../empty';

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
        EmptyModule
    ],
    declarations: [RefundsComponent, SearchFormComponent, RefundStatusColorPipe, TableComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class RefundsModule {}
