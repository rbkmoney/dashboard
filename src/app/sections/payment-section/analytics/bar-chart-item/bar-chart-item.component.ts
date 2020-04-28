import { Component, Input } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { ChartData } from '../utils';

@Component({
    selector: 'dsh-bar-chart-item',
    templateUrl: './bar-chart-item.component.html'
})
export class BarChartItemComponent {
    @Input() spinnerType: SpinnerType;
    @Input() title: string;
    @Input() chartData: ChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
}
