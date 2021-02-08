import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { anyString, anything, mock, objectContaining, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { UserService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { MOCK_MEMBER } from '../../tests/mock-member';
import { MOCK_ORG } from '../../tests/mock-org';
import { OrganizationManagementService } from './organization-management.service';

describe('OrganizationManagementService', () => {
    let mockOrganizationsService: OrganizationsService;
    let mockUserService: UserService;

    let service: OrganizationManagementService;

    const SOME_USER_ID = 'some_user_id';

    beforeEach(() => {
        mockOrganizationsService = mock(OrganizationsService);
        mockUserService = mock(UserService);

        when(mockUserService.id$).thenReturn(of(SOME_USER_ID));
        when(mockOrganizationsService.getOrgMember(anyString(), anyString())).thenReturn(of(MOCK_MEMBER));
        when(mockOrganizationsService.createOrg(anything())).thenReturn(of(MOCK_ORG));

        TestBed.configureTestingModule({
            providers: [
                OrganizationManagementService,
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(UserService, mockUserService),
            ],
        });

        service = TestBed.inject(OrganizationManagementService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getCurrentMember', () => {
        it('should be return member', () => {
            const member$ = service.getCurrentMember(MOCK_ORG.id);
            expect(member$).toBeObservable(cold('(a|)', { a: MOCK_MEMBER }));
            verify(mockOrganizationsService.getOrgMember(MOCK_ORG.id, SOME_USER_ID)).once();
        });
    });

    describe('createOrganization', () => {
        it('should be return org', () => {
            const org$ = service.createOrganization(MOCK_ORG);
            expect(org$).toBeObservable(cold('(a|)', { a: MOCK_ORG }));
            verify(mockOrganizationsService.createOrg(objectContaining({ owner: SOME_USER_ID, ...MOCK_ORG }))).once();
        });
    });

    describe('isOrganizationOwner', () => {
        it('should be return false', () => {
            const member$ = service.isOrganizationOwner(MOCK_ORG);
            expect(member$).toBeObservable(cold('(a|)', { a: false }));
        });
        it('should be return true', () => {
            when(mockUserService.id$).thenReturn(of(MOCK_ORG.owner));
            const member$ = service.isOrganizationOwner(MOCK_ORG);
            expect(member$).toBeObservable(cold('(a|)', { a: true }));
        });
    });
});
