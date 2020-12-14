import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentsFiltersComponent } from './payments-filters.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PaymentsFiltersComponent],
    exports: [PaymentsFiltersComponent],
})
export class PaymentsFiltersModule {}
