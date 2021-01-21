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

import { ClaimsService } from '@dsh/api/claims';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { TableModule } from '@dsh/components/table';

import { LAYOUT_GAP } from '../tokens';
import { ClaimsListModule } from './claims-list';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsSearchFiltersModule } from './claims-search-filters';
import { ClaimsComponent } from './claims.component';

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
        ClaimsListModule,
        ClaimsSearchFiltersModule,
    ],
    declarations: [ClaimsComponent],
    exports: [ClaimsComponent],
    providers: [{ provide: LAYOUT_GAP, useValue: '20px' }, ClaimsService],
})
export class ClaimsModule {}
