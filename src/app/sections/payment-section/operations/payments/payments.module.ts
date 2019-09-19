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

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { TableModule } from '../../../../table';
import { LocaleModule } from '../../../../locale';
import { SearchFormComponent } from './search-form';
import { FormControlsModule } from '../../../../form-controls';
import { DaterangeSelectorModule } from '../daterange-selector';
import { StatusModule } from '../../../../status';
import { PaymentStatusColorPipe } from './status-color.pipe';
import { ViewUtilsModule } from '../../../../view-utils';
import { LastUpdatedModule } from './last-updated/last-updated.module';
import { TableComponent } from './table';
import { SpinnerModule } from '../../../../spinner';
import { DropdownModule } from '../../../../dropdown';
import { StateNavModule } from '../../../../state-nav';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TableModule,
        MatIconModule,
        LocaleModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule,
        FormControlsModule,
        DaterangeSelectorModule,
        StatusModule,
        ViewUtilsModule,
        LastUpdatedModule,
        SpinnerModule,
        MatSnackBarModule,
        DropdownModule,
        StateNavModule,
        TranslocoModule
    ],
    declarations: [PaymentsComponent, SearchFormComponent, PaymentStatusColorPipe, TableComponent]
})
export class PaymentsModule {}
