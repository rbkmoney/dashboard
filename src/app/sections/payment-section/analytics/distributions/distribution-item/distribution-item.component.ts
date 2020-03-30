import { Component, Input } from '@angular/core';

import { DistributionChartData } from '../../utils';

@Component({
    selector: 'dsh-distribution-item',
    templateUrl: './distribution-item.component.html'
})
export class DistributionItemComponent {
    @Input() title: string;
    @Input() chartData: DistributionChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
}
