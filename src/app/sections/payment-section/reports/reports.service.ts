import { Injectable } from '@angular/core';
import { timer, ReplaySubject } from 'rxjs';
import { map, switchMap, shareReplay, debounce } from 'rxjs/operators';

import { ReportsService as ReportsApiService } from '../../../api';
import { SearchParams } from './search-params';

@Injectable()
export class ReportsService {
    private params$ = new ReplaySubject<SearchParams>();
    private reportsWithToken$ = this.params$.pipe(
        debounce(() => timer(1000)),
        switchMap(params => this.reportsService.searchReports(params)),
        shareReplay(1)
    );
    reports$ = this.reportsWithToken$.pipe(map(({ result }) => result));
    continuationToken$ = this.reportsWithToken$.pipe(map(({ continuationToken }) => continuationToken));

    constructor(private reportsService: ReportsApiService) {}

    search(params: SearchParams) {
        this.params$.next(params);
    }
}
