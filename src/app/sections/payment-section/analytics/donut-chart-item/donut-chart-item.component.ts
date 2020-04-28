import { Component, Input } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { DistributionChartData } from '../utils';

@Component({
    selector: 'dsh-donut-chart-item',
    templateUrl: './donut-chart-item.component.html'
})
export class DonutChartItemComponent {
    @Input() spinnerType: SpinnerType;
    @Input() title: string;
    @Input() chartData: DistributionChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
}
