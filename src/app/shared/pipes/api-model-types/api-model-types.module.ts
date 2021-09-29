import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { DepositStatusColorPipe } from './deposit-status-color.pipe';
import { DepositStatusNamePipe } from './deposit-status-name.pipe';
import { InvoiceTemplateCostTypeNamePipe } from './invoice-template-cost-type-name.pipe';
import { InvoiceTemplateTypeNamePipe } from './invoice-template-type-name.pipe';
import { PayoutToolDetailsTypePipe } from './payout-tool-details-type.pipe';
import { WithdrawalStatusColorPipe } from './withdrawal-status-color.pipe';
import { WithdrawalStatusNamePipe } from './withdrawal-status-name.pipe';

const DECLARATIONS = [
    ClaimStatusColorPipe,
    PayoutToolDetailsTypePipe,
    DepositStatusColorPipe,
    DepositStatusNamePipe,
    InvoiceTemplateTypeNamePipe,
    InvoiceTemplateCostTypeNamePipe,
    WithdrawalStatusNamePipe,
    WithdrawalStatusColorPipe,
];

@NgModule({
    imports: [TranslocoModule],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'api-model-types' }],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class ApiModelTypesModule {}
