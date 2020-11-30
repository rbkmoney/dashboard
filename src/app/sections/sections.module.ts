import { NgModule } from '@angular/core';

import { DEFAULT_SEARCH_LIMIT, LAYOUT_GAP, SEARCH_LIMIT } from '@dsh/app/sections/constants';

import { ShopModule } from '../api/shop';
import { WalletModule } from '../api/wallet';
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
