import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { DaterangeManagerModule } from '@dsh/app/shared/services/date-range-manager';
import { FiltersModule } from '@dsh/components/filters';

import { AdditionalFiltersModule } from './additional-filters';
import { DepositsFiltersComponent } from './deposits-filters.component';

@NgModule({
    imports: [
        DaterangeManagerModule,
        FlexModule,
        CommonModule,
        FiltersModule,
        TranslocoModule,
        AdditionalFiltersModule,
    ],
    declarations: [DepositsFiltersComponent],
    exports: [DepositsFiltersComponent],
})
export class DepositsFiltersModule {}
