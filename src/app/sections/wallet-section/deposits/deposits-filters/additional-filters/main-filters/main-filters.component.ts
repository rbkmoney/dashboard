import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { MainFilters } from './types/main-filters';

@UntilDestroy()
@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFiltersComponent {
    @Input() form: FormGroup<MainFilters>;
}
