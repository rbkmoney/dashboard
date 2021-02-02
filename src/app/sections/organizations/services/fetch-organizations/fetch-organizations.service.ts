import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrganizationsService } from '@dsh/api';
import { Organization } from '@dsh/api-codegen/organizations';

import { DEBOUNCE_FETCHER_ACTION_TIME, FetchResult, IndicatorsPartialFetcher } from '../../../partial-fetcher';
import { SEARCH_LIMIT } from '../../../tokens';

@Injectable()
export class FetchOrganizationsService extends IndicatorsPartialFetcher<Organization, void> {
    constructor(
        private organizationsService: OrganizationsService,
        @Inject(SEARCH_LIMIT) searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME) debounceActionTime: number
    ) {
        super(searchLimit, debounceActionTime);
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        return this.organizationsService.listOrgMembership(this.searchLimit, continuationToken);
    }
}
