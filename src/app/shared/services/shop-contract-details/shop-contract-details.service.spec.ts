import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { instance, mock, when } from 'ts-mockito';

import { Contract } from '@dsh/api-codegen/capi';
import { ContractsService } from '@dsh/api/contracts';

import { ShopContractDetailsService } from './shop-contract-details.service';

describe('ShopContractDetailsService', () => {
    let service: ShopContractDetailsService;
    let mockContractsService: ContractsService;

    beforeEach(() => {
        mockContractsService = mock(ContractsService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ShopContractDetailsService,
                {
                    provide: ContractsService,
                    useFactory: () => instance(mockContractsService),
                },
            ],
        });
        service = TestBed.inject(ShopContractDetailsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getContract', () => {
        it('should tick contract value if contracts came with no errors', () => {
            const creationDate = new Date();
            // can't test it with cold/hot marbles cause it's an subject
            service.shopContract$.pipe(take(1)).subscribe((data) => {
                expect(data).toEqual({
                    id: 'my_id',
                    createdAt: creationDate,
                    status: Contract.StatusEnum.Active,
                    contractor: {
                        contractorType: 'LegalEntity',
                    } as any,
                    paymentInstitutionID: 2,
                });
            });

            when(mockContractsService.getContractByID('my_id')).thenReturn(
                of({
                    id: 'my_id',
                    createdAt: creationDate,
                    status: Contract.StatusEnum.Active,
                    contractor: {
                        contractorType: 'LegalEntity',
                    },
                    paymentInstitutionID: 2,
                })
            );

            service.requestContract('my_id');

            expect().nothing();
        });

        it('should tick errors value if contracts came with errors', () => {
            when(mockContractsService.getContractByID('my_id')).thenReturn(
                of(null).pipe(
                    map(() => {
                        throw new Error(`[TEST_ERROR]: Error in observable`);
                    })
                )
            );

            service.requestContract('my_id');

            expect(service.errorOccurred$).toBeObservable(
                cold('a', {
                    a: true,
                })
            );
        });
    });
});
