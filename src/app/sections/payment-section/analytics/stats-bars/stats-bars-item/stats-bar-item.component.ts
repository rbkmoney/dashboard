import { Component, Input } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { ChartData } from '../../utils';

@Component({
    selector: 'dsh-stats-bar-item',
    templateUrl: './stats-bar-item.component.html'
})
export class StatsBarItemComponent {
    @Input() spinnerType: SpinnerType;
    @Input() title: string;
    @Input() chartData: ChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
}
