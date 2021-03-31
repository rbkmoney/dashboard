import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@ngneat/transloco';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { anyNumber, anything, instance, mock, verify, when } from 'ts-mockito';

import { CAPIClaimsService, CAPIPartiesService, OrganizationsService } from '@dsh/api';
import { ApiShopsService } from '@dsh/api/shop';
import { ErrorService, KeycloakTokenInfoService } from '@dsh/app/shared';

import { BootstrapService } from './bootstrap.service';

fdescribe('BootstrapService', () => {
    let service: BootstrapService;
    let mockApiShopsService: ApiShopsService;
    let mockCAPIClaimsService: CAPIClaimsService;
    let mockCAPIPartiesService: CAPIPartiesService;
    let mockErrorService: ErrorService;
    let mockOrganizationsService: OrganizationsService;
    let mockKeycloakTokenInfoService: KeycloakTokenInfoService;
    let mockTranslocoService: TranslocoService;

    beforeEach(() => {
        mockApiShopsService = mock(ApiShopsService);
        mockCAPIClaimsService = mock(CAPIClaimsService);
        mockCAPIPartiesService = mock(CAPIPartiesService);
        mockErrorService = mock(ErrorService);
        mockOrganizationsService = mock(OrganizationsService);
        mockKeycloakTokenInfoService = mock(KeycloakTokenInfoService);
        mockTranslocoService = mock(TranslocoService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BootstrapService,
                { provide: ApiShopsService, useFactory: () => instance(mockApiShopsService) },
                { provide: CAPIClaimsService, useFactory: () => instance(mockCAPIClaimsService) },
                { provide: CAPIPartiesService, useFactory: () => instance(mockCAPIPartiesService) },
                { provide: ErrorService, useFactory: () => instance(mockErrorService) },
                { provide: OrganizationsService, useFactory: () => instance(mockOrganizationsService) },
                { provide: KeycloakTokenInfoService, useFactory: () => instance(mockKeycloakTokenInfoService) },
                { provide: TranslocoService, useFactory: () => instance(mockTranslocoService) },
            ],
        });
        service = TestBed.inject(BootstrapService);
    });

    beforeEach(() => {
        when(mockCAPIPartiesService.getMyParty()).thenReturn(of('party' as any));
        when(mockCAPIClaimsService.createClaim(anything())).thenReturn(of('claim' as any));
        when(mockOrganizationsService.createOrg(anything())).thenReturn(of('org' as any));
        when(mockOrganizationsService.listOrgMembership(anyNumber())).thenReturn(of({ result: ['membership' as any] }));
        when(mockKeycloakTokenInfoService.partyID$).thenReturn(of('partyId1' as any));
        when(mockApiShopsService.shops$).thenReturn(of(['shop1' as any]));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('bootstrap', () => {
        it('should be init party, org and shop', () => {
            service.bootstrap();
            service.bootstrapped$.subscribe().unsubscribe();
            verify(mockCAPIPartiesService.getMyParty()).once();
            verify(mockOrganizationsService.createOrg(anything())).never();
            verify(mockCAPIClaimsService.createClaim(anything())).never();
            expect().nothing();
        });

        it('should be created org', () => {
            when(mockOrganizationsService.listOrgMembership(anyNumber())).thenReturn(of({ result: [] }));
            service.bootstrap();
            service.bootstrapped$.subscribe().unsubscribe();
            verify(mockOrganizationsService.createOrg(anything())).once();
            expect().nothing();
        });

        it('should be created shop', () => {
            when(mockApiShopsService.shops$).thenReturn(of([]));
            service.bootstrap();
            service.bootstrapped$.subscribe().unsubscribe();
            verify(mockCAPIClaimsService.createClaim(anything())).once();
            expect().nothing();
        });

        it('should be return error', () => {
            when(mockCAPIPartiesService.getMyParty()).thenReturn(throwError('error'));
            service.bootstrap();
            service.bootstrapped$.subscribe().unsubscribe();
            verify(mockErrorService.error(anything())).once();
            expect().nothing();
        });

        it('should be return true after bootstrap', () => {
            expect(service.bootstrapped$).toBeObservable(cold('(a)', { a: false }));
            service.bootstrap();
            expect(service.bootstrapped$).toBeObservable(cold('(a)', { a: true }));
        });
    });
});
