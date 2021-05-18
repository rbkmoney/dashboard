import { InjectionToken } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

import { ChartsThemeProvider } from './payment-section/analytics/charts-theme';

export const SEARCH_LIMIT = new InjectionToken<number>('searchLimit');
export const DEFAULT_SEARCH_LIMIT = 10;

export type DialogConfig = { small: MatDialogConfig; medium: MatDialogConfig; large: MatDialogConfig };
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('dialogConfig');
const BASE_CONFIG: MatDialogConfig = {
    ...new MatDialogConfig(),
    maxHeight: '90vh',
    disableClose: true,
    autoFocus: false,
    panelClass: 'dsh-dialog-pane',
};
export const DEFAULT_DIALOG_CONFIG: DialogConfig = {
    small: { ...BASE_CONFIG, width: '360px' },
    medium: { ...BASE_CONFIG, width: '552px' },
    large: { ...BASE_CONFIG, width: '648px' },
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
