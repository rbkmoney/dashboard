import { Component, Input } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { DistributionChartData } from '../../utils';

@Component({
    selector: 'dsh-distribution-item',
    templateUrl: './distribution-item.component.html'
})
export class DistributionItemComponent {
    @Input() spinnerType: SpinnerType;
    @Input() title: string;
    @Input() chartData: DistributionChartData;
    @Input() isLoading: boolean;
    @Input() error: Error;
}
