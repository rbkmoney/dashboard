import { InjectionToken } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

import { ChartsThemeProvider } from './payment-section/analytics/charts-theme';

/**
 * @deprecated
 */
export const LAYOUT_GAP = new InjectionToken<string>('layoutGap');

export const SEARCH_LIMIT = new InjectionToken<number>('searchLimit');
export const DEFAULT_SEARCH_LIMIT = 10;

export const DEFAULT_UPDATE_DELAY_TOKEN = new InjectionToken<number>('default-update-delay-token');
export const DEFAULT_UPDATE_DELAY = 300;

export type DialogConfig = { small: MatDialogConfig; medium: MatDialogConfig; large: MatDialogConfig };
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('dialogConfig');
const baseConfig: MatDialogConfig = {
    maxHeight: '90vh',
    disableClose: true,
    autoFocus: false,
};
export const DEFAULT_DIALOG_CONFIG: DialogConfig = {
    small: { ...baseConfig, width: '360px' },
    medium: { ...baseConfig, width: '552px' },
    large: { ...baseConfig, width: '648px' },
};

export const DEFAULT_CHARTS_THEME: ChartsThemeProvider = {
    stackedBarChart: ['#67DAAA', '#FC9B51', '#FB7777', '#9E9E9E'],
    barChart: ['#695BFF'],
    donutChart: [
        '#38C1CD',
        '#E9E452',
        '#5B9FFF',
        '#BB5BFF',
        '#FFAB91',
        '#CD3876',
        '#81C784',
        '#FC9B51',
        '#695BFF',
        '#9E9E9E',
    ],
};
