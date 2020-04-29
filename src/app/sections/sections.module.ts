import { NgModule } from '@angular/core';

import { ShopModule } from '../api/shop';
import { WalletModule } from '../api/wallet';
import { LAYOUT_GAP } from './constants';
import { MainModule } from './main';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsComponent } from './sections.component';

@NgModule({
    imports: [MainModule, SectionsRoutingModule, ShopModule, WalletModule],
    declarations: [SectionsComponent],
    exports: [SectionsComponent],
    providers: [{ provide: LAYOUT_GAP, useValue: '20px' }]
})
export class SectionsModule {}
