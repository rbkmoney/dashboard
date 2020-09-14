import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { ContractorDetailsModule } from '../contractor-details';
import { ContractDetailsComponent } from './contract-details.component';

@NgModule({
    imports: [FlexLayoutModule, TranslocoModule, CommonModule, MatDividerModule, ContractorDetailsModule, LayoutModule],
    declarations: [ContractDetailsComponent],
    exports: [ContractDetailsComponent],
})
export class ContractDetailsModule {}
