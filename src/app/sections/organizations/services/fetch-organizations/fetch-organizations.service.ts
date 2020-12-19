import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { OrganizationsService } from '../../../../api';
import { Organization } from '../../../../api-codegen/organizations';
import { SEARCH_LIMIT } from '../../../constants';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { mockOrg } from '../../tests/mock-org';

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, void> {
    constructor(
        // tslint:disable-next-line
        private organizationsService: OrganizationsService,
        // tslint:disable-next-line
        @Inject(SEARCH_LIMIT) private searchLimit: number
    ) {
        super();
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        // return this.organizationsService.getOrganizations(this.searchLimit, continuationToken);
        return of({ result: new Array(10).fill(mockOrg) }).pipe(delay(1));
    }
}
