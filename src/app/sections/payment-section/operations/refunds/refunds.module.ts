import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
        TranslocoModule,
        StateNavModule,
        MatMenuModule
    ],
    declarations: [RefundsComponent, SearchFormComponent, RefundStatusColorPipe, TableComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class RefundsModule {}
