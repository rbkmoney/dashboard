import { TestBed } from '@angular/core/testing';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { Claim, Modification } from '@dsh/api-codegen/claim-management';
import { ClaimsService } from '@dsh/api/claims';
import { createTestContractCreationModification } from '@dsh/api/claims/claim-party-modification';

import { createTestContractPayoutToolModification } from '../../tests/create-test-contract-payout-tool-modification';
import { createTestInternationalLegalEntityModification } from '../../tests/create-test-international-legal-entity-modification';
import { createTestShopCreationModification } from '../../tests/create-test-shop-creation-modification';
import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';
import { CreateInternationalShopEntityService } from './create-international-shop-entity.service';

const TEST_UUID = 'test-uuid';

describe('CreateInternationalShopEntityService', () => {
    let service: CreateInternationalShopEntityService;
    let mockClaimsService: ClaimsService;
    let mockIdGeneratorService: IdGeneratorService;

    let claim: Claim;
    let creationData: InternationalShopEntityFormValue;
    let modifications: Modification[];

    beforeEach(() => {
        mockClaimsService = mock(ClaimsService);
        mockIdGeneratorService = mock(IdGeneratorService);

        claim = {
            id: 100500,
            status: 'active',
            changeset: [],
            revision: 5,
            createdAt: new Date(),
        };
        creationData = {
            shopUrl: 'url.com',
            shopName: 'my name',
            organizationName: 'org name',
            tradingName: 'trading',
            registeredAddress: 'registered address',
            actualAddress: 'actual address',
            country: 'USA',
            payoutTool: {
                number: '',
                name: '',
                country: '',
                address: '',
                bic: '',
                abaRtn: '000000',
                iban: '',
            },
        };
        modifications = [
            createTestInternationalLegalEntityModification(TEST_UUID, creationData),
            createTestContractCreationModification(TEST_UUID, TEST_UUID),
            createTestContractPayoutToolModification(TEST_UUID, TEST_UUID, creationData),
            createTestShopCreationModification(TEST_UUID, TEST_UUID, TEST_UUID, creationData),
        ];

        when(mockIdGeneratorService.uuid()).thenReturn(TEST_UUID);
        when(mockClaimsService.createClaim(anything())).thenReturn(of(claim));
        when(mockClaimsService.requestReviewClaimByID(claim.id, claim.revision)).thenReturn(of(null));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CreateInternationalShopEntityService,
                {
                    provide: ClaimsService,
                    useFactory: () => instance(mockClaimsService),
                },
                {
                    provide: IdGeneratorService,
                    useFactory: () => instance(mockIdGeneratorService),
                },
            ],
        });

        service = TestBed.inject(CreateInternationalShopEntityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createShop', () => {
        afterEach(() => {
            expect().nothing();
        });

        it('should create with no correspondentAccount', () => {
            service.createShop(creationData).pipe(take(1)).subscribe();

            verify(mockClaimsService.createClaim(anything())).once();
        });

        it('should create with correspondentAccount', () => {
            creationData = {
                ...creationData,
                correspondentPayoutTool: {
                    number: '',
                    name: '',
                    country: '',
                    address: '',
                    bic: '',
                    abaRtn: '000000',
                    iban: '',
                },
            };

            when(mockClaimsService.createClaim(anything())).thenReturn(of(claim));

            service.createShop(creationData).pipe(take(1)).subscribe();

            verify(mockClaimsService.createClaim(anything())).once();
        });

        it('should request review using claim data', () => {
            service.createShop(creationData).pipe(take(1)).subscribe();

            verify(mockClaimsService.requestReviewClaimByID(claim.id, claim.revision)).once();
        });

        it('should return observable with created claim', () => {
            const expected$ = cold('(a|)', {
                a: claim,
            });

            expect(service.createShop(creationData)).toBeObservable(expected$);
        });
    });
});
