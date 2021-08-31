import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';

import { MainInfoFilters } from './types/main-info-filters';

@Component({
    selector: 'dsh-main-info-filters',
    templateUrl: './main-info-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoFiltersComponent {
    @Input() form: FormGroup<MainInfoFilters>;
}
