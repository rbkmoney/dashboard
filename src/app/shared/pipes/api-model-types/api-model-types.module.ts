import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { ClaimStatusColorPipe } from './claim-status-color.pipe';
import { PayoutToolDetailsTypePipe } from './payout-tool-details-type.pipe';

const declarations = [ClaimStatusColorPipe, PayoutToolDetailsTypePipe];

@NgModule({
    imports: [TranslocoModule],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'api-model-types' }],
    declarations,
    exports: declarations,
})
export class ApiModelTypesModule {}
