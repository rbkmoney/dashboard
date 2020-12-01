import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { Report } from '../../../api-codegen/anapi';
import { FetchReportsService } from './fetch-reports.service';

@Injectable()
export class ReportsExpandedIdManager extends ExpandedIdManager<Report> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchReportsService: FetchReportsService
    ) {
        super(route, router);
    }

    protected fragmentNotFound(): void {
        this.fetchReportsService.fetchMore();
    }

    protected get dataSet$(): Observable<Report[]> {
        return this.fetchReportsService.searchResult$;
    }
}
