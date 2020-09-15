import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { BankAccountDetailsModule } from '../bank-account-details';
import { ContractorDetailsComponent } from './contractor-details.component';
import { InternationalLegalEntityComponent } from './international-legal-entity';
import { LegalEntityComponent } from './legal-entity';
import { RussianLegalEntityComponent } from './russian-legal-entity';

@NgModule({
    imports: [
        FlexLayoutModule,
        TranslocoModule,
        CommonModule,
        MatDividerModule,
        LayoutModule,
        BankAccountDetailsModule,
    ],
    declarations: [
        ContractorDetailsComponent,
        LegalEntityComponent,
        RussianLegalEntityComponent,
        InternationalLegalEntityComponent,
    ],
    exports: [ContractorDetailsComponent],
})
export class ContractorDetailsModule {}
