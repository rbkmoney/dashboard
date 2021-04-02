import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member, Organization, RoleId } from '@dsh/api-codegen/organizations';
import { KeycloakTokenInfoService } from '@dsh/app/shared';
import { Initializable } from '@dsh/app/shared/types';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

@Injectable()
export class OrganizationManagementService implements Initializable {
    currentMember$: Observable<Member>;
    members$: Observable<Member[]>;
    isOrganizationOwner$: Observable<boolean>;
    isOrganizationAdmin$: Observable<boolean>;
    hasAdminAccess$: Observable<boolean>;

    private organization$ = new ReplaySubject<Organization>();

    constructor(
        private organizationsService: OrganizationsService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {
        this.currentMember$ = combineLatest([this.organization$, this.keycloakTokenInfoService.partyID$]).pipe(
            switchMap(([{ id: orgId }, userId]) => this.organizationsService.getOrgMember(orgId, userId)),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.isOrganizationOwner$ = combineLatest([this.organization$, this.keycloakTokenInfoService.partyID$]).pipe(
            map(([{ owner }, id]) => owner === id),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.isOrganizationAdmin$ = this.currentMember$.pipe(
            map((member) => member.roles.findIndex((r) => r.roleId === RoleId.Administrator) !== -1),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.hasAdminAccess$ = combineLatest([this.isOrganizationAdmin$, this.isOrganizationOwner$]).pipe(
            map((hasAdminLikeRoles) => !hasAdminLikeRoles.includes(false)),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.members$ = this.organization$.pipe(
            switchMap(({ id }) => this.organizationsService.listOrgMembers(id)),
            pluck('result'),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    init(organization: Organization) {
        this.organization$.next(organization);
    }
}
