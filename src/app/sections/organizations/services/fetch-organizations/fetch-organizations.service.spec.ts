import { TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { instance, mock } from 'ts-mockito';

import { OrganizationsService } from '../../../../api';
import { UserService } from '../../../../shared';
import { SEARCH_LIMIT } from '../../../constants';
import { FetchOrganizationsService } from './fetch-organizations.service';

describe('FetchOrganizationsService', () => {
    let mockOrganizationsService: OrganizationsService;
    let mockKeycloakService: KeycloakService;
    let mockUserService: UserService;

    let service: FetchOrganizationsService;

    beforeEach(() => {
        mockOrganizationsService = mock(OrganizationsService);
        mockKeycloakService = mock(KeycloakService);
        mockUserService = mock(UserService);

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
                {
                    provide: UserService,
                    useValue: instance(mockUserService),
                },
                {
                    provide: SEARCH_LIMIT,
                    useValue: 5,
                },
            ],
        });

        service = TestBed.inject(FetchOrganizationsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // TODO
    // it('should fetch', (done) => {
    //     const orgs = new Array(5).fill(mockOrg);
    //     const result = { results: orgs };
    //     when(mockOrganizationsService.getOrganizations(5, undefined)).thenReturn(of(result));
    //     const sub = service.searchResult$.subscribe((v) => {
    //         verify(mockOrganizationsService.getOrganizations(5, undefined)).called();
    //         expect(v).toEqual(orgs);
    //         sub.unsubscribe();
    //         done();
    //     });
    //     service.search();
    // });
});
