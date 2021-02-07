import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { DEBOUNCE_FETCHER_ACTION_TIME } from '../../../partial-fetcher';
import { SEARCH_LIMIT } from '../../../tokens';
import { mockOrg } from '../../tests/mock-org';
import { mockOrgs } from '../../tests/mock-orgs';
import { FetchOrganizationsService } from './fetch-organizations.service';

describe('FetchOrganizationsService', () => {
    let mockOrganizationsService: OrganizationsService;

    let service: FetchOrganizationsService;

    beforeEach(() => {
        mockOrganizationsService = mock(OrganizationsService);

        TestBed.configureTestingModule({
            providers: [
                FetchOrganizationsService,
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockToken(SEARCH_LIMIT, 5),
                provideMockToken(DEBOUNCE_FETCHER_ACTION_TIME, 0),
            ],
        });

        service = TestBed.inject(FetchOrganizationsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch', (done) => {
        const orgs = new Array(5).fill(mockOrg);
        when(mockOrganizationsService.listOrgMembership(5, undefined)).thenReturn(of(mockOrgs));
        const sub = service.searchResult$.subscribe((v) => {
            verify(mockOrganizationsService.listOrgMembership(5, undefined)).called();
            expect(v).toEqual(orgs);
            sub.unsubscribe();
            done();
        });
        service.search();
    });
});
