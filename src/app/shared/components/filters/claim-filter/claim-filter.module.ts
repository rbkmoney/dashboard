import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterModule } from '@dsh/components/filter';

import { ClaimFieldModule } from '../../inputs/claim-field';
import { ClaimFilterComponent } from './claim-filter.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FilterModule, ClaimFieldModule],
    declarations: [ClaimFilterComponent],
    exports: [ClaimFilterComponent],
})
export class ClaimFilterModule {}
