import { InjectionToken } from '@angular/core';

export type ChartsThemeProvider = {
    stackedBarChart: string[];
    barChart: string[];
    donutChart: string[];
};
export const CHARTS_THEME = new InjectionToken<ChartsThemeProvider>('Charts theme');
