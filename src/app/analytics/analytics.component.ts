import { Component } from '@angular/core';
import { PieChartData } from '../charts/pie-chart/pie-chart.component';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
    public exampleData: Array<PieChartData> = [
        { value: 25, caption: 'apples', color: 'gray' },
        { value: 25, caption: 'oranges', color: 'green' },
        { value: 25, caption: 'bananas', color: 'purple' },
        { value: 25, caption: 'bananas', color: 'orange' }
    ];

    public pieChartData: Array<PieChartData> = this.exampleData;

    constructor() {}

    public toggleCharts() {
        this.pieChartData = this.pieChartData.map(point => {
            point.value = Math.random() * 25;
            return point;
        });
    }
}
