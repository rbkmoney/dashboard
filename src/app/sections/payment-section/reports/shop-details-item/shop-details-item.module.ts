import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { ShopDetailsItemComponent } from './shop-details-item.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, LayoutModule],
    declarations: [ShopDetailsItemComponent],
    exports: [ShopDetailsItemComponent],
})
export class ShopDetailsItemModule {}
