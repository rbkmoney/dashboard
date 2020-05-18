import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { DistributionChartData } from '../utils';

@Component({
    selector: 'dsh-donut-chart-item',
    templateUrl: './donut-chart-item.component.html',
    styleUrls: ['donut-chart-item.component.scss'],
})
export class DonutChartItemComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;
    @Input() title: string;
    @Input() chartData: DistributionChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.chartData?.currentValue) {
            this.error = undefined;
        }
    }
}
