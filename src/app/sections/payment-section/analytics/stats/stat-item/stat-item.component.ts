import { Component, Input } from '@angular/core';

import { StatData } from '../../utils';

@Component({
    selector: 'dsh-stat-item',
    templateUrl: './stat-item.component.html'
})
export class StatItemComponent {
    @Input() subtitle: string;
    @Input() statData: StatData;
    @Input() isLoading: boolean;
    @Input() error: Error;
}
