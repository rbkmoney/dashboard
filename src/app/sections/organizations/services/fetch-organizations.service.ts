import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { OrganizationsService } from '../../../api';
import { Member, Organization, OrganizationMembership } from '../../../api-codegen/organizations';
import { KeycloakService } from '../../../auth';
import { FetchResult, PartialFetcher } from '../../partial-fetcher';

interface OrganizationsSearchParams {
    limit?: number;
}

@Injectable()
export class FetchOrganizationsService extends PartialFetcher<OrganizationMembership, OrganizationsSearchParams> {
    constructor(private organizationsService: OrganizationsService, private keycloakService: KeycloakService) {
        super();
    }

    protected fetch(
        params: OrganizationsSearchParams,
        continuationToken?: string
    ): Observable<FetchResult<OrganizationMembership>> {
        return this.organizationsService.getOrganizations(params.limit, continuationToken).pipe(
            // TODO: Need UserService
            withLatestFrom(this.keycloakService.loadUserProfile()),
            switchMap(([{ results, continuationToken: newContinuationToken }, { id: userId }]) =>
                this.getOrganizationsMembers(results, userId).pipe(
                    map((members, idx) => ({
                        results: members.map((member) => ({
                            member,
                            org: results[idx],
                        })),
                        continuationToken: newContinuationToken,
                    }))
                )
            )
        );
    }

    private getOrganizationsMembers(organizations: Organization[], userId: string): Observable<Member[]> {
        return merge<Member[]>(...organizations.map(({ id }) => this.organizationsService.getMember(id, userId)));
    }
}
