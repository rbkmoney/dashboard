import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { anyString, anything, mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { MOCK_MEMBER } from '@dsh/api/organizations/tests/mock-member';
import { MOCK_ORG } from '@dsh/api/organizations/tests/mock-org';
import { KeycloakTokenInfoService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { OrganizationManagementService } from './organization-management.service';

describe('OrganizationManagementService', () => {
    let mockOrganizationsService: OrganizationsService;
    let mockKeycloakTokenInfoService: KeycloakTokenInfoService;

    let service: OrganizationManagementService;

    const SOME_USER_ID = 'some_user_id';

    beforeEach(() => {
        mockOrganizationsService = mock(OrganizationsService);
        mockKeycloakTokenInfoService = mock(KeycloakTokenInfoService);

        when(mockKeycloakTokenInfoService.partyID$).thenReturn(of(SOME_USER_ID));
        when(mockOrganizationsService.getOrgMember(anyString(), anyString())).thenReturn(of(MOCK_MEMBER));
        when(mockOrganizationsService.createOrg(anything())).thenReturn(of(MOCK_ORG));

        TestBed.configureTestingModule({
            providers: [
                OrganizationManagementService,
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(KeycloakTokenInfoService, mockKeycloakTokenInfoService),
            ],
        });

        service = TestBed.inject(OrganizationManagementService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getCurrentMember', () => {
        it('should be return member', () => {
            service.init(MOCK_ORG);
            expect(service.currentMember$).toBeObservable(cold('(a)', { a: MOCK_MEMBER }));
            verify(mockOrganizationsService.getOrgMember(MOCK_ORG.id, SOME_USER_ID)).once();
        });
    });

    describe('isOrganizationOwner', () => {
        it('should be return false', () => {
            service.init(MOCK_ORG);
            const member$ = service.isOrganizationOwner$;
            expect(member$).toBeObservable(cold('(a)', { a: false }));
        });

        it('should be return true', () => {
            service.init(MOCK_ORG);
            when(mockKeycloakTokenInfoService.partyID$).thenReturn(of(MOCK_ORG.owner));
            const member$ = service.isOrganizationOwner$;
            expect(member$).toBeObservable(cold('(a)', { a: true }));
        });
    });
});
