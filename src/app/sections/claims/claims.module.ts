import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatOptionModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CardModule } from '../../layout/card';
import { LAYOUT_GAP } from '../constants';
import { SearchFormComponent } from './search-form';
import { JustifyWrapperModule } from '../../layout/justify-wrapper';
import { FloatPanelModule } from '../../layout/float-panel';
import { TableModule } from '../../table';
import { TableComponent } from './table';
import { StatusModule } from '../../status';
import { ChangesetToTypePipe } from './changeset-to-type.pipe';
import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { DropdownModule } from '../../dropdown';
import { StateNavModule } from '../../state-nav';
import { ButtonModule } from '../../button';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';
import { ClaimsService } from '../../api/claims';
import { SpinnerModule } from '../../spinner';
import { HeadlineModule } from '../../layout/headline';
import { LastUpdatedModule } from '../payment-section/operations/last-updated/last-updated.module';

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
