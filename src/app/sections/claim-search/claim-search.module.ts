import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatOptionModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ClaimSearchComponent } from './claim-search.component';
import { ClaimSearchRoutingModule } from './claim-search-routing.module';
import { CardModule } from '../../layout/card';
import { LAYOUT_GAP } from '../constants';
import { SearchFormComponent } from './search-form';
import { JustifyWrapperModule } from '../../layout/justify-wrapper';
import { FloatPanelModule } from '../../layout/float-panel';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [ClaimSearchRoutingModule, CardModule, FlexModule, MatOptionModule, TranslocoModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, JustifyWrapperModule, FloatPanelModule, MatInputModule],
    declarations: [ClaimSearchComponent, SearchFormComponent],
    exports: [ClaimSearchComponent],
    providers: [
        { provide: LAYOUT_GAP, useValue: '20px' }
    ]
})
export class ClaimSearchModule {}
