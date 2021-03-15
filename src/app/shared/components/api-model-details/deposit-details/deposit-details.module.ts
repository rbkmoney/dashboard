import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { DepositStatusColorPipe } from './invoice-status-color.pipe';
import { DepositStatusNamePipe } from './invoice-status-name.pipe';

@NgModule({
    imports: [TranslocoModule],
    declarations: [DepositStatusColorPipe, DepositStatusNamePipe],
    exports: [DepositStatusColorPipe, DepositStatusNamePipe],
})
export class DepositDetailsModule {}
