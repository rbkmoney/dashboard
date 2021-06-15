import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { ShopsFieldModule } from '@dsh/app/shared/components/inputs/shops-field';
import { FilterModule } from '@dsh/components/filter';

import { ShopsFilterComponent } from './shops-filter.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FilterModule, ShopsFieldModule],
    declarations: [ShopsFilterComponent],
    exports: [ShopsFilterComponent],
})
export class ShopsFilterModule {}
