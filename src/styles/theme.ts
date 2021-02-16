import { InjectionToken } from '@angular/core';

export type Theme = {
    charts: {
        stackedBarChartColors: string[];
        barChartColors: string[];
        donutChartColors: string[];
    };
};

export const THEME = new InjectionToken<Theme>('theme');

// const CHART_PALETTE = [
//     '#67DAAA',
//     '#FC9B51',
//     '#FB7777',
//     '#9E9E9E',
//     '#695BFF',
//     '#E9E452',
//     '#5B9FFF',
//     '#BB5BFF',
//     '#CD3876',
//     '#FFAB91',
//     '#38C1CD',
//     '#FB7777',
//     '#81C784',
//     '#FFCC80',
//     '#BEF67A',
//     '#FFF8E1',
// ];

export const DEFAULT_THEME_CONFIG: Theme = {
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
