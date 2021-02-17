import { InjectionToken } from '@angular/core';

export type Color = string;
export type Palette = { base: Color };

export type Theme = {
    primary: Palette;
    charts: {
        stackedBarChartColors: Color[];
        barChartColors: Color[];
        donutChartColors: Color[];
    };
};

export const THEME = new InjectionToken<Theme>('theme');

export const DEFAULT_THEME_CONFIG: Theme = {
    primary: {
        base: '#695BFF',
    },
    charts: {
        stackedBarChartColors: ['#67DAAA', '#FC9B51', '#FB7777', '#9E9E9E'],
        barChartColors: ['#695BFF'],
        donutChartColors: [
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
    },
};
