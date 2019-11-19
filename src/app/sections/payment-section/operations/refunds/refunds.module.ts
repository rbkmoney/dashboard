import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import {
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
} from '@angular/material';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsComponent } from './refunds.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { TableModule } from '../../../../table';
import { SearchFormComponent } from './search-form';
import { FormControlsModule } from '../../../../form-controls';
import { DaterangeSelectorModule } from '../daterange-selector';
import { StatusModule } from '../../../../status';
import { RefundStatusColorPipe } from './status-color.pipe';
import { FromMinorModule } from '../../../../from-minor';
import { LastUpdatedModule } from '../last-updated/last-updated.module';
import { TableComponent } from './table';
import { SpinnerModule } from '../../../../spinner';
import { DropdownModule } from '../../../../dropdown';
import { StateNavModule } from '../../../../state-nav';

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
        MatDatepickerModule,
        MatSelectModule,
        FormControlsModule,
        DaterangeSelectorModule,
        StatusModule,
        FromMinorModule,
        LastUpdatedModule,
        SpinnerModule,
        MatSnackBarModule,
        DropdownModule,
        TranslocoModule,
        StateNavModule
    ],
    declarations: [RefundsComponent, SearchFormComponent, RefundStatusColorPipe, TableComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class RefundsModule {}
