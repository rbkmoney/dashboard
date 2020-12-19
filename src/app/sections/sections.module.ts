import { NgModule } from '@angular/core';

import { ShopModule } from '@dsh/api/shop';
import { WalletModule } from '@dsh/api/wallet';
import {
    DEFAULT_SEARCH_LIMIT,
    DialogConfig,
    DIALOG_CONFIG,
    LAYOUT_GAP,
    SEARCH_LIMIT,
} from '@dsh/app/sections/constants';

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
        {
            provide: DIALOG_CONFIG,
            useValue: {
                small: {
                    width: '360px',
                    maxHeight: '90vh',
                    disableClose: true,
                },
                medium: {
                    width: '552px',
                    maxHeight: '90vh',
                    disableClose: true,
                },
                large: {
                    width: '648px',
                    maxHeight: '90vh',
                    disableClose: true,
                },
            } as DialogConfig,
        },
    ],
})
export class SectionsModule {}
