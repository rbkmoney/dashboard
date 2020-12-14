import { NgModule } from '@angular/core';

import { ShopModule } from '@dsh/api/shop';
import { WalletModule } from '@dsh/api/wallet';

import { DEFAULT_SEARCH_LIMIT, LAYOUT_GAP, SEARCH_LIMIT } from './constants';
import { MainModule } from './main';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsComponent } from './sections.component';

@NgModule({
    imports: [MainModule, SectionsRoutingModule, ShopModule, WalletModule],
    declarations: [SectionsComponent],
    exports: [SectionsComponent],
    providers: [
        { provide: LAYOUT_GAP, useValue: '20px' },
        { provide: SEARCH_LIMIT, useValue: DEFAULT_SEARCH_LIMIT },
    ],
})
export class SectionsModule {}
