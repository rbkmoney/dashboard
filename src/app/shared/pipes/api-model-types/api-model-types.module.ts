import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { PayoutToolDetailsTypePipe } from './payout-tool-details-type.pipe';

@NgModule({
    imports: [TranslocoModule],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'api-model-types' }],
    declarations: [PayoutToolDetailsTypePipe],
    exports: [PayoutToolDetailsTypePipe],
})
export class ApiModelTypesModule {}
