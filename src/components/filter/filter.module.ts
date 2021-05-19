import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { DropdownModule } from '@dsh/components/layout';

import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { FilterContentComponent } from './components/filter-content/filter-content.component';
import { FilterComponent } from './filter.component';

@NgModule({
    imports: [CommonModule, DropdownModule, FlexLayoutModule, MatDividerModule, TranslocoModule, ButtonModule],
    declarations: [FilterComponent, FilterButtonComponent, FilterContentComponent],
    exports: [FilterComponent],
})
export class FilterModule {}
