import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, pluck, switchMap, take } from 'rxjs/operators';

import { OrganizationsService } from '../../../../api';
import { Organization } from '../../../../api-codegen/organizations';
import { UserService } from '../../../../shared';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { mockOrg } from '../../tests/mock-org';

export type PaginationLimit = number;
export const PAGINATION_LIMIT = new InjectionToken<PaginationLimit>('paginationLimit');
const DEFAULT_PAGINATION_LIMIT = 100;

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<Organization, void> {
    constructor(
        // tslint:disable-next-line
        private organizationsService: OrganizationsService,
        // tslint:disable-next-line
        @Optional() @Inject(PAGINATION_LIMIT) private paginationLimit: PaginationLimit,
        private userService: UserService
    ) {
        super();
        this.paginationLimit = paginationLimit ?? DEFAULT_PAGINATION_LIMIT;
    }

    create(organization: Omit<Organization, 'id' | 'createdAt' | 'owner'>) {
        return this.userService.profile$.pipe(
            take(1),
            pluck('id'),
            // TODO: change after fix Organization['owner'] type
            switchMap((owner: never) =>
                this.organizationsService.createOrganization({
                    owner,
                    ...organization,
                })
            )
        );
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<Organization>> {
        // return this.organizationsService.getOrganizations(this.paginationLimit, continuationToken);
        return of({ result: new Array(10).fill(mockOrg) }).pipe(delay(1));
    }
}