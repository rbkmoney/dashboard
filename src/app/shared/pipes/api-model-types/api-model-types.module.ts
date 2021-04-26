import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { DepositStatusColorPipe } from './deposit-status-color.pipe';
import { DepositStatusNamePipe } from './deposit-status-name.pipe';
import { PayoutToolDetailsTypePipe } from './payout-tool-details-type.pipe';

const DECLARATIONS = [ClaimStatusColorPipe, PayoutToolDetailsTypePipe, DepositStatusColorPipe, DepositStatusNamePipe];

@NgModule({
    imports: [TranslocoModule],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'api-model-types' }],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class ApiModelTypesModule {}
