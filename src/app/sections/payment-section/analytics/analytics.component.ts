import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';

@Component({
    templateUrl: 'analytics.component.html',
    styleUrls: ['analytics.component.scss']
})
export class AnalyticsComponent {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
        {
            name: 'Подтвержден',
            data: [44, 55, 41, 67, 22, 43]
        },
        {
            name: 'Возвращен',
            data: [13, 23, 20, 8, 13, 27]
        },
        {
            name: 'Запущен',
            data: [11, 17, 15, 15, 21, 14]
        },
        {
            name: 'Неуспешен',
            data: [21, 7, 25, 13, 22, 8]
        }
    ];
}
