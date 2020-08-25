import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '../../buttons';
import { IndicatorsModule } from '../../indicators';
import { FilterModule } from '../filter';
import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { OtherFiltersComponent } from './other-filters.component';

const EXPORTED_DECLARATIONS = [OtherFiltersDialogComponent, OtherFiltersComponent];

@NgModule({
    imports: [
        FilterModule,
        MatDialogModule,
        CommonModule,
        ButtonModule,
        MatDividerModule,
        FlexLayoutModule,
        IndicatorsModule,
        TranslocoModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class OtherFiltersModule {}
