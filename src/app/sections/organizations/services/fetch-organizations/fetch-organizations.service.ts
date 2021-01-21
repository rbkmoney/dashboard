import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrganizationsService } from '../../../../api';
import { Organization } from '../../../../api-codegen/organizations';
import { SEARCH_LIMIT } from '../../../tokens';
import { FetchResult, PartialFetcher } from '../partial-fetcher';

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, void> {
    constructor(private organizationsService: OrganizationsService, @Inject(SEARCH_LIMIT) private searchLimit: number) {
        super();
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        return this.organizationsService.getOrganizations(this.searchLimit, continuationToken);
    }
}
