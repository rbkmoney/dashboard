import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtendedModule } from '@angular/flex-layout';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DEBOUNCE_FETCHER_ACTION_TIME, DEFAULT_FETCHER_DEBOUNCE_ACTION_TIME } from '@rbkmoney/partial-fetcher';

import { ShopModule } from '@dsh/api/shop';
import { WalletModule } from '@dsh/api/wallet';

import { FeedbackModule } from '../feedback';
import { HomeModule } from '../home';
import { CHARTS_THEME } from './payment-section/analytics/charts-theme';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsComponent } from './sections.component';
import {
    DEFAULT_CHARTS_THEME,
    DEFAULT_DIALOG_CONFIG,
    DEFAULT_SEARCH_LIMIT,
    DIALOG_CONFIG,
    SEARCH_LIMIT,
} from './tokens';

@NgModule({
    imports: [
        CommonModule,
        ShopModule,
        WalletModule,
        SectionsRoutingModule,
        FeedbackModule,
        HomeModule,
        ExtendedModule,
    ],
    providers: [
        { provide: SEARCH_LIMIT, useValue: DEFAULT_SEARCH_LIMIT },
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: DEFAULT_DIALOG_CONFIG.medium },
        { provide: DIALOG_CONFIG, useValue: DEFAULT_DIALOG_CONFIG },
        { provide: DEBOUNCE_FETCHER_ACTION_TIME, useValue: DEFAULT_FETCHER_DEBOUNCE_ACTION_TIME },
        { provide: CHARTS_THEME, useValue: DEFAULT_CHARTS_THEME },
    ],
    declarations: [SectionsComponent],
    exports: [SectionsRoutingModule],
})
export class SectionsModule {}
