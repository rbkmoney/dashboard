import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { Claim, Modification } from '@dsh/api-codegen/claim-management';
import { ClaimsService } from '@dsh/api/claims';
import { createTestContractCreationModification } from '@dsh/api/claims/claim-party-modification';
import { UuidGeneratorService } from '@dsh/app/shared/services/uuid-generator/uuid-generator.service';

import { createTestContractPayoutToolModification } from '../../tests/create-test-contract-payout-tool-modification';
import { createTestInternationalLegalEntityModification } from '../../tests/create-test-international-legal-entity-modification';
import { createTestShopCreationModification } from '../../tests/create-test-shop-creation-modification';
import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';
import { CreateInternationalShopEntityService } from './create-international-shop-entity.service';

const TEST_UUID = 'test-uuid';

describe('CreateInternationalShopEntityService', () => {
    let service: CreateInternationalShopEntityService;
    let mockClaimsService: ClaimsService;
    let mockUuidGeneratorService: UuidGeneratorService;

    beforeEach(() => {
        mockClaimsService = mock(ClaimsService);
        mockUuidGeneratorService = mock(UuidGeneratorService);
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
                    provide: UuidGeneratorService,
                    useFactory: () => instance(mockUuidGeneratorService),
                },
            ],
        });

        service = TestBed.inject(CreateInternationalShopEntityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createShop', () => {
        const claim: Claim = {
            id: 100500,
            status: 'active',
            changeset: [],
            revision: 5,
            createdAt: new Date(),
        };
        let creationData: InternationalShopEntityFormValue = {
            shopUrl: 'url.com',
            shopName: 'my name',
            organizationName: 'org name',
            tradingName: 'trading',
            registeredAddress: 'registered address',
            actualAddress: 'actual address',
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
        let modifications: Modification[] = [
            createTestInternationalLegalEntityModification(TEST_UUID, creationData),
            createTestContractCreationModification(TEST_UUID, TEST_UUID),
            createTestContractPayoutToolModification(TEST_UUID, TEST_UUID, creationData),
            createTestShopCreationModification(TEST_UUID, TEST_UUID, TEST_UUID, creationData)
        ];

        beforeEach(() => {
            when(mockUuidGeneratorService.generateUUID()).thenReturn(TEST_UUID);
            when(mockClaimsService.createClaim(deepEqual(modifications))).thenReturn(of(claim));
            when(mockClaimsService.requestReviewClaimByID(claim.id, claim.revision)).thenReturn(of(null));
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should create with no correspondentAccount', () => {
            service.createShop(creationData).pipe(take(1)).subscribe();

            verify(mockClaimsService.createClaim(deepEqual(modifications))).once();
        });

        it('should create with correspondentAccount', () => {
            creationData = {
                shopUrl: 'url.com',
                shopName: 'my name',
                organizationName: 'org name',
                tradingName: 'trading',
                registeredAddress: 'registered address',
                actualAddress: 'actual address',
                payoutTool: {
                    number: '',
                    name: '',
                    country: '',
                    address: '',
                    bic: '',
                    abaRtn: '000000',
                    iban: '',
                },
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

            modifications = [
                createTestInternationalLegalEntityModification(TEST_UUID, creationData),
                createTestContractCreationModification(TEST_UUID, TEST_UUID),
                createTestContractPayoutToolModification(TEST_UUID, TEST_UUID, creationData),
                createTestShopCreationModification(TEST_UUID, TEST_UUID, TEST_UUID, creationData)
            ];

            when(mockClaimsService.createClaim(deepEqual(modifications))).thenReturn(of(claim));

            service.createShop(creationData).pipe(take(1)).subscribe();

            verify(mockClaimsService.createClaim(deepEqual(modifications))).once();
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
