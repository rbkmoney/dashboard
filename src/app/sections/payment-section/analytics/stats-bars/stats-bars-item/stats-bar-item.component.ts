import { Component, Input } from '@angular/core';

import { ChartData } from '../../utils';

@Component({
    selector: 'dsh-stats-bar-item',
    templateUrl: './stats-bar-item.component.html'
})
export class StatsBarItemComponent {
    @Input() title: string;
    @Input() chartData: ChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
}
