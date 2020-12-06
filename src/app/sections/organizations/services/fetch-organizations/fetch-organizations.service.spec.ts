import { TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';
import { anyString, instance, mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '../../../../api';
import { mockMemeber } from '../../tests/mock-member';
import { mockOrg } from '../../tests/mock-org';
import { FetchOrganizationsService } from './fetch-organizations.service';

describe('FetchOrganizationsService', () => {
    let mockOrganizationsService: OrganizationsService;
    let mockKeycloakService: KeycloakService;

    let service: FetchOrganizationsService;

    beforeEach(() => {
        mockOrganizationsService = mock(OrganizationsService);
        mockKeycloakService = mock(KeycloakService);

        TestBed.configureTestingModule({
            providers: [
                FetchOrganizationsService,
                {
                    provide: OrganizationsService,
                    useValue: instance(mockOrganizationsService),
                },
                {
                    provide: KeycloakService,
                    useValue: instance(mockKeycloakService),
                },
            ],
        });

        service = TestBed.inject(FetchOrganizationsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should search', (done) => {
        const orgs = { results: new Array(5).fill(mockOrg) };
        when(mockOrganizationsService.getOrganizations(5, undefined)).thenReturn(of(orgs));
        when(mockOrganizationsService.getMember(anyString(), anyString())).thenReturn(of(mockMemeber));
        when(mockKeycloakService.loadUserProfile()).thenReturn(of({ id: 'userId' }) as any);
        const sub = service.searchResult$.subscribe((v) => {
            verify(mockOrganizationsService.getOrganizations(5, undefined)).called();
            verify(mockOrganizationsService.getMember(anyString(), anyString())).called();
            verify(mockKeycloakService.loadUserProfile()).called();
            expect(v).toEqual(orgs.results.map((org) => ({ org, member: mockMemeber })));

            sub.unsubscribe();
            done();
        });
        service.search({ limit: 5 });
    });
});
