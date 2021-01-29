import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToMajorModule } from '@dsh/app/shared/pipes';

import { BalanceComponent } from './balance.component';

@NgModule({
    imports: [CommonModule, ToMajorModule],
    declarations: [BalanceComponent],
    exports: [BalanceComponent],
})
export class BalanceModule {}
