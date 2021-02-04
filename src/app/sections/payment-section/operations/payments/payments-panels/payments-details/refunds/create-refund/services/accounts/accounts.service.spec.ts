import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { AccountService } from '@dsh/api/account';
import { ApiShopsService } from '@dsh/api/shop';

import { AccountsService } from './accounts.service';

describe('AccountFinderService', () => {
    let service: AccountsService;
    let mockApiShopsService: ApiShopsService;
    let mockAccountService: AccountService;

    beforeEach(() => {
        mockApiShopsService = mock(ApiShopsService);
        mockAccountService = mock(AccountService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AccountsService,
                {
                    provide: ApiShopsService,
                    useFactory: () => instance(mockApiShopsService),
                },
                {
                    provide: AccountService,
                    useFactory: () => instance(mockAccountService),
                },
            ],
        });
        service = TestBed.inject(AccountsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAccount', () => {
        it('should request account using shop id', () => {
            when(mockApiShopsService.getShopByID('my_shop_id')).thenReturn(
                of({
                    id: 'my_shop_id',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: { url: 'test.com', locationType: 'url' },
                    details: { name: 'shop name' },
                    contractID: 'contractID',
                    account: {
                        currency: 'USD',
                        guaranteeID: 66,
                        settlementID: 345,
                    },
                })
            );
            when(mockAccountService.getAccountByID(345)).thenReturn(
                of({
                    id: 345,
                    ownAmount: 5000,
                    availableAmount: 4000,
                    currency: 'USD',
                })
            );

            expect(service.getAccount('my_shop_id')).toBeObservable(
                cold('(a|)', {
                    a: {
                        id: 345,
                        ownAmount: 5000,
                        availableAmount: 4000,
                        currency: 'USD',
                    },
                })
            );
        });
    });
});
