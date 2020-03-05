import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BalanceWidgetComponent } from './balance-widget.component';
import { BalanceItemComponent } from './balance-item/balance-item.component';

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule, TranslocoModule],
    declarations: [BalanceWidgetComponent, BalanceItemComponent],
    exports: [BalanceWidgetComponent]
})
export class BalanceWidgetModule {}
