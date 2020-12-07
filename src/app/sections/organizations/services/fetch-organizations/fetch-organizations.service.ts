import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { OrganizationsService } from '../../../../api';
import { Member, Organization, OrganizationMembership } from '../../../../api-codegen/organizations';
import { KeycloakService } from '../../../../auth';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';

export type PaginationLimit = number;
export const PAGINATION_LIMIT = new InjectionToken<PaginationLimit>('paginationLimit');
const DEFAULT_PAGINATION_LIMIT = 100;

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<OrganizationMembership, void> {
    constructor(
        private organizationsService: OrganizationsService,
        private keycloakService: KeycloakService,
        @Optional() @Inject(PAGINATION_LIMIT) private paginationLimit: PaginationLimit
    ) {
        super();
        this.paginationLimit = paginationLimit ?? DEFAULT_PAGINATION_LIMIT;
    }

    protected fetch(_params: void, continuationToken?: string): Observable<FetchResult<OrganizationMembership>> {
        return this.organizationsService.getOrganizations(this.paginationLimit, continuationToken).pipe(
            // TODO: Need UserService
            withLatestFrom(this.keycloakService.loadUserProfile()),
            switchMap(([{ results, continuationToken: newContinuationToken }, { id: userId }]) =>
                this.getOrganizationsMembers(results, userId).pipe(
                    map(
                        (members, idx): FetchResult<OrganizationMembership> => ({
                            result: members.map((member) => ({
                                member,
                                org: results[idx],
                            })),
                            continuationToken: newContinuationToken,
                        })
                    )
                )
            )
        );
    }

    private getOrganizationsMembers(organizations: Organization[], userId: string): Observable<Member[]> {
        return combineLatest(organizations.map(({ id }) => this.organizationsService.getMember(id, userId)));
    }
}
