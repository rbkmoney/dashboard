import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';

import { MainFilters } from './types/main-filters';

@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFiltersComponent {
    @Input() form: FormGroup<MainFilters>;
}
