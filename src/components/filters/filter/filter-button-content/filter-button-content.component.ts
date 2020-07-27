import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-filter-button-content',
    templateUrl: 'filter-button-content.component.html',
    styleUrls: ['filter-button-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterButtonContentComponent {}
