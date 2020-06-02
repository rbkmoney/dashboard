import { NgModule } from '@angular/core';

import { DepositsModule as DepositsApiModule } from '../../../api/deposits';
import { DepositComponent } from './deposit';
import { DepositsComponent } from './deposits.component';

@NgModule({
    imports: [DepositsApiModule],
    declarations: [DepositsComponent, DepositComponent],
    exports: [DepositsComponent],
})
export class DepositsModule {}
