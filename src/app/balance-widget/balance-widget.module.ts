import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { BalanceItemComponent } from './balance-item/balance-item.component';
import { BalanceWidgetComponent } from './balance-widget.component';

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule, TranslocoModule],
    declarations: [BalanceWidgetComponent, BalanceItemComponent],
    exports: [BalanceWidgetComponent],
})
export class BalanceWidgetModule {}
