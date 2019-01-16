import { Component } from '@angular/core';
import { PieChartData } from '../charts/pie-chart/pie-chart.component';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

    public exampleData: Array<PieChartData> = [
        { value: 10, caption: 'apples', color: '#6b486b' },
        { value: 20, caption: 'oranges', color: '#98abc5' },
        { value: 30, caption: 'bananas', color: '#8a89a6' }
    ];

    public pieChartData: Array<PieChartData> = this.exampleData;

    constructor() {
    }

    public toggleCharts() {
        this.pieChartData = [...this.pieChartData, { value: 7, caption: 'some', color: 'black' }];
    }

}
