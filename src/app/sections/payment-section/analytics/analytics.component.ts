import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from './search-params';

@Component({
    templateUrl: 'analytics.component.html',
})
export class AnalyticsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    searchParams$ = new Subject<SearchParams>();

    updateSearchParams(searchParams) {
        this.searchParams$.next(searchParams);
    }
}
