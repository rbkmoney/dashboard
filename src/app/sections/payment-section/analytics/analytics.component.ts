import { Component } from '@angular/core';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import moment from 'moment';

@Component({
    templateUrl: 'analytics.component.html'
})
export class AnalyticsComponent {
    paymentsCount: ApexAxisChartSeries = [
        {
            name: 'Подтвержден',
            data: [1241, 122, 214, 45, 435, 345, 95]
        },
        {
            name: 'Неуспешен',
            data: [30, 12, 43, 12, 23, 31, 23]
        },
        {
            name: 'Возвращен',
            data: [20, 10, 12, 12, 33, 11, 9]
        },
        {
            name: 'Запущен',
            data: [100, 50, 30, 20, 30, 10, 10]
        },
        {
            name: 'Отменен',
            data: [4, 5, 21, 12, 3, 41, 12]
        }
    ];
    paymentsAmount: ApexAxisChartSeries = [
        {
            data: [10, 5, 21, 12, 3, 41, 12]
        }
    ];
    paymentTools = [10, 20, 30, 40];
    paymentsCountTimes = [
        moment().subtract(7, 'd'),
        moment().subtract(6, 'd'),
        moment().subtract(5, 'd'),
        moment().subtract(4, 'd'),
        moment().subtract(3, 'd'),
        moment().subtract(2, 'd'),
        moment().subtract(1, 'd')
    ];
    paymentsAmountTimes = [
        moment().subtract(7, 'd'),
        moment().subtract(6, 'd'),
        moment().subtract(5, 'd'),
        moment().subtract(4, 'd'),
        moment().subtract(3, 'd'),
        moment().subtract(2, 'd'),
        moment().subtract(1, 'd')
    ];
    paymentToolsLabels = ['Банковские карты', 'Токенезированные методы', 'Терминалы оплаты', 'Прочие'];
}
