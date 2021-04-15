import { Inject, Injectable } from '@angular/core';
import { DEBOUNCE_FETCHER_ACTION_TIME, FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';

import { OrganizationsService } from '@dsh/api';
import { Organization } from '@dsh/api-codegen/organizations';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, void> {
    constructor(
        private organizationsService: OrganizationsService,
        @Inject(SEARCH_LIMIT) private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME) debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        return this.organizationsService.listOrgMembership(this.searchLimit, continuationToken);
    }
}
