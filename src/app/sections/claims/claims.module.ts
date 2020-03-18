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
import { TableModule } from '@dsh/components/table';

import { ClaimsService } from '../../api/claims';
import { DropdownModule } from '../../dropdown';
import { CardModule } from '../../layout/card';
import { FloatPanelModule } from '../../layout/float-panel';
import { HeadlineModule } from '../../layout/headline';
import { JustifyWrapperModule } from '../../layout/justify-wrapper';
import { SpinnerModule } from '../../spinner';
import { StateNavModule } from '../../state-nav';
import { StatusModule } from '../../status';
import { LAYOUT_GAP } from '../constants';
import { LastUpdatedModule } from '../payment-section/operations/last-updated/last-updated.module';
import { ChangesetToTypePipe } from './changeset-to-type.pipe';
import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';
import { SearchFormComponent } from './search-form';
import { TableComponent } from './table';

@NgModule({
    imports: [
        ClaimsRoutingModule,
        CardModule,
        FlexModule,
        MatOptionModule,
        TranslocoModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        JustifyWrapperModule,
        FloatPanelModule,
        MatInputModule,
        TableModule,
        StatusModule,
        MatIconModule,
        DropdownModule,
        StateNavModule,
        ButtonModule,
        SpinnerModule,
        HeadlineModule,
        LastUpdatedModule
    ],
    declarations: [ClaimsComponent, SearchFormComponent, TableComponent, ChangesetToTypePipe, ClaimStatusColorPipe],
    exports: [ClaimsComponent],
    providers: [{ provide: LAYOUT_GAP, useValue: '20px' }, ClaimsService]
})
export class ClaimsModule {}
