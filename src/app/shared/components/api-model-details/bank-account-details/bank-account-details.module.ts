import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { BankAccountDetailsComponent } from './bank-account-details.component';

@NgModule({
    imports: [FlexLayoutModule, TranslocoModule, CommonModule, LayoutModule],
    declarations: [BankAccountDetailsComponent],
    exports: [BankAccountDetailsComponent],
})
export class BankAccountDetailsModule {}
