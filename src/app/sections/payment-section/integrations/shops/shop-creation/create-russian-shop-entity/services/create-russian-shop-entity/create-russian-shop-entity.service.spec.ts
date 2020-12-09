import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { Contract } from '@dsh/api-codegen/capi';
import { Claim, Modification } from '@dsh/api-codegen/claim-management';
import { ClaimsService } from '@dsh/api/claims';
import {
    createTestContractorModification,
    createTestLegalEntityModification,
    createTestRussianContractPayoutToolModification,
    createTestShopCreationModification,
} from '@dsh/api/claims/claim-party-modification';
import { UuidGeneratorService } from '@dsh/app/shared/services/uuid-generator/uuid-generator.service';

import { RussianShopCreateData } from '../../types/russian-shop-create-data';
import { CreateRussianShopEntityService } from './create-russian-shop-entity.service';

const TEST_UUID = 'test-uuid';

describe('CreateRussianShopEntityService', () => {
    let service: CreateRussianShopEntityService;
    let mockClaimsService: ClaimsService;
    let mockUuidGeneratorService: UuidGeneratorService;

    beforeEach(() => {
        mockClaimsService = mock(ClaimsService);
        mockUuidGeneratorService = mock(UuidGeneratorService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CreateRussianShopEntityService,
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

        service = TestBed.inject(CreateRussianShopEntityService);
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
        let creationData: RussianShopCreateData = {
            payoutToolID: 'my_id',
            url: 'www.example.com',
            name: 'test shop',
            bankAccount: {
                bankBik: '0000000',
                bankName: 'test bank',
                bankPostAccount: 'post account',
                account: 'account',
            },
            contract: {
                id: 'contract_id',
                createdAt: new Date(),
                status: Contract.StatusEnum.Active,
                paymentInstitutionID: 1,
                contractor: {
                    contractorType: 'LegalEntity',
                    actualAddress: 'actualAddress',
                    bankAccount: 'bankAccount',
                    inn: 'inn',
                    postAddress: 'postAddress',
                    registeredName: 'registeredName',
                    registeredNumber: 'registeredNumber',
                    representativeDocument: 'representativeDocument',
                    representativeFullName: 'representativeFullName',
                    representativePosition: 'representativePosition',
                } as any,
            },
        };
        let modifications: Modification[];

        beforeEach(() => {
            when(mockUuidGeneratorService.generateUUID()).thenReturn(TEST_UUID);
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should call create claim with existing payout tool modifications', () => {
            creationData = {
                payoutToolID: 'my_id',
                url: 'www.example.com',
                name: 'test shop',
                bankAccount: {
                    bankBik: '0000000',
                    bankName: 'test bank',
                    bankPostAccount: 'post account',
                    account: 'account',
                },
                contract: {
                    id: 'contract_id',
                    createdAt: new Date(),
                    status: Contract.StatusEnum.Active,
                    paymentInstitutionID: 1,
                    contractor: {
                        contractorType: 'LegalEntity',
                        actualAddress: 'actualAddress',
                        bankAccount: 'bankAccount',
                        inn: 'inn',
                        postAddress: 'postAddress',
                        registeredName: 'registeredName',
                        registeredNumber: 'registeredNumber',
                        representativeDocument: 'representativeDocument',
                        representativeFullName: 'representativeFullName',
                        representativePosition: 'representativePosition',
                    } as any,
                },
            };

            modifications = [
                createTestLegalEntityModification(TEST_UUID, creationData),
                createTestContractorModification(TEST_UUID, TEST_UUID),
                createTestShopCreationModification(TEST_UUID, TEST_UUID, 'my_id', creationData),
            ];

            when(mockClaimsService.createClaim(deepEqual(modifications))).thenReturn(of(claim));
            when(mockClaimsService.requestReviewClaimByID).thenReturn(() => of(null));

            service.createShop(creationData);

            verify(mockClaimsService.createClaim(deepEqual(modifications))).once();
        });

        it('should call create claim with new payout tool modifications', () => {
            creationData = {
                payoutToolID: null,
                url: 'www.example.com',
                name: 'test shop',
                bankAccount: {
                    bankBik: '0000000',
                    bankName: 'test bank',
                    bankPostAccount: 'post account',
                    account: 'account',
                },
                contract: {
                    id: 'contract_id',
                    createdAt: new Date(),
                    status: Contract.StatusEnum.Active,
                    paymentInstitutionID: 1,
                    contractor: {
                        contractorType: 'LegalEntity',
                        actualAddress: 'actualAddress',
                        bankAccount: 'bankAccount',
                        inn: 'inn',
                        postAddress: 'postAddress',
                        registeredName: 'registeredName',
                        registeredNumber: 'registeredNumber',
                        representativeDocument: 'representativeDocument',
                        representativeFullName: 'representativeFullName',
                        representativePosition: 'representativePosition',
                    } as any,
                },
            };

            modifications = [
                createTestLegalEntityModification(TEST_UUID, creationData),
                createTestContractorModification(TEST_UUID, TEST_UUID),
                createTestRussianContractPayoutToolModification(TEST_UUID, TEST_UUID, creationData),
                createTestShopCreationModification(TEST_UUID, TEST_UUID, TEST_UUID, creationData),
            ];

            when(mockClaimsService.createClaim(deepEqual(modifications))).thenReturn(of(claim));
            when(mockClaimsService.requestReviewClaimByID).thenReturn(() => of(null));

            service.createShop(creationData);

            verify(mockClaimsService.createClaim(deepEqual(modifications))).once();
        });

        it('should request review using claim data', () => {
            when(mockClaimsService.createClaim).thenReturn(() => of(claim));
            when(mockClaimsService.requestReviewClaimByID(claim.id, claim.revision)).thenReturn(of(null));

            service.createShop(creationData).pipe(take(1)).subscribe();

            verify(mockClaimsService.requestReviewClaimByID(claim.id, claim.revision)).once();
        });

        it('should return observable with created claim', () => {
            const expected$ = cold('(a|)', {
                a: claim,
            });

            when(mockClaimsService.createClaim).thenReturn(() => of(claim));
            when(mockClaimsService.requestReviewClaimByID).thenReturn(() => of(null));

            expect(service.createShop(creationData)).toBeObservable(expected$);
        });
    });
});
