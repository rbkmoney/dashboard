import { ChangeDetectionStrategy, Component } from '@angular/core';

import { OtherFiltersService } from '@dsh/components/filters/other-filters';

@Component({
    selector: 'dsh-reports-search-other-filters',
    templateUrl: 'reports-search-other-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSearchOtherFiltersComponent {
    constructor(public data: OtherFiltersService) {}
}
