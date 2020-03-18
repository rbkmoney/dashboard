import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-empty-search-result',
    templateUrl: 'empty-search-result.component.html',
    styleUrls: ['empty-search-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptySearchResultComponent {}
