import { NgModule } from '@angular/core';

import { WithdrawalsModule as WithdrawalsApiModule } from '../../../api/withdrawals';
import { WithdrawalComponent } from './withdrawal';
import { WithdrawalsComponent } from './withdrawals.component';

@NgModule({
    imports: [WithdrawalsApiModule],
    declarations: [WithdrawalsComponent, WithdrawalComponent],
    exports: [WithdrawalsComponent],
})
export class WithdrawalsModule {}
