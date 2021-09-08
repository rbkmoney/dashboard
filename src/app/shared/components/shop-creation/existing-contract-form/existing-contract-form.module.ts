import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { ContractorDetailsModule, ErrorMessageModule } from '@dsh/app/shared';
import { ShopFieldModule } from '@dsh/app/shared/components/inputs/shop-field';

import { ExistingContractFormComponent } from './existing-contract-form.component';

@NgModule({
    imports: [
        TranslocoModule,
        ShopFieldModule,
        FlexModule,
        ReactiveFormsModule,
        CommonModule,
        ErrorMessageModule,
        ContractorDetailsModule,
    ],
    declarations: [ExistingContractFormComponent],
    exports: [ExistingContractFormComponent],
})
export class ExistingContractFormModule {}
