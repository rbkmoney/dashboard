import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrganizationsService } from '@dsh/api';
import { Organization } from '@dsh/api-codegen/organizations';

import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { SEARCH_LIMIT } from '../../../tokens';

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, void> {
    constructor(private organizationsService: OrganizationsService, @Inject(SEARCH_LIMIT) private searchLimit: number) {
        super();
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        return this.organizationsService.listOrgMembership(this.searchLimit, continuationToken);
    }
}
