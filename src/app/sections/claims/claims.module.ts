import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { TableModule } from '@dsh/components/table';

import { ClaimsService } from '../../api/claims';
import { LAYOUT_GAP } from '../constants';
import { ChangesetToTypePipe } from './changeset-to-type.pipe';
import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';
import { SearchFormComponent } from './search-form';
import { TableComponent } from './table';

@NgModule({
    imports: [
        ClaimsRoutingModule,
        LayoutModule,
        FlexModule,
        MatOptionModule,
        TranslocoModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        TableModule,
        IndicatorsModule,
        MatIconModule,
        StateNavModule,
        ButtonModule,
    ],
    declarations: [ClaimsComponent, SearchFormComponent, TableComponent, ChangesetToTypePipe, ClaimStatusColorPipe],
    exports: [ClaimsComponent],
    providers: [{ provide: LAYOUT_GAP, useValue: '20px' }, ClaimsService],
})
export class ClaimsModule {}
