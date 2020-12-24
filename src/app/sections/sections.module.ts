import { NgModule } from '@angular/core';

import { ShopModule } from '@dsh/api/shop';
import { WalletModule } from '@dsh/api/wallet';

import { MainModule } from './main';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsComponent } from './sections.component';
import { DEFAULT_DIALOG_CONFIG, DEFAULT_SEARCH_LIMIT, DIALOG_CONFIG, LAYOUT_GAP, SEARCH_LIMIT } from './tokens';

@NgModule({
    imports: [MainModule, SectionsRoutingModule, ShopModule, WalletModule],
    declarations: [SectionsComponent],
    exports: [SectionsComponent],
    providers: [
        { provide: LAYOUT_GAP, useValue: '20px' },
        { provide: SEARCH_LIMIT, useValue: DEFAULT_SEARCH_LIMIT },
        { provide: DIALOG_CONFIG, useValue: DEFAULT_DIALOG_CONFIG },
    ],
})
export class SectionsModule {}
