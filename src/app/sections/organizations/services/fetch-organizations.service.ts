import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrganizationsService } from '../../../api';
import { Organization } from '../../../api-codegen/organizations';
import { FetchResult, PartialFetcher } from '../../partial-fetcher';

interface OrganizationsSearchParams {
    limit?: number;
}

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, OrganizationsSearchParams> {
    constructor(private organizationsService: OrganizationsService) {
        super();
    }

    protected fetch(
        params: OrganizationsSearchParams,
        continuationToken?: string
    ): Observable<FetchResult<Organization>> {
        return this.organizationsService.getOrganizations(params.limit, continuationToken);
    }
}
