import { NgModule } from '@angular/core';

import { ShopModule } from '@dsh/api/shop';
import { WalletModule } from '@dsh/api/wallet';

import { DEFAULT_THEME_CONFIG, THEME } from '../../styles/theme';
import { MainModule } from './main';
import { DEBOUNCE_FETCHER_ACTION_TIME, DEFAULT_FETCHER_DEBOUNCE_ACTION_TIME } from './partial-fetcher';
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
        { provide: DEBOUNCE_FETCHER_ACTION_TIME, useValue: DEFAULT_FETCHER_DEBOUNCE_ACTION_TIME },
        { provide: THEME, useValue: DEFAULT_THEME_CONFIG },
    ],
})
export class SectionsModule {}
