import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { InlineResponse200, ShopLocation } from '../../../../../../api-codegen/anapi/swagger-codegen';
import { Shop } from '../../../../../../api-codegen/capi/swagger-codegen';
import { AnalyticsService } from '../../../../../../api/analytics';
import { PaymentInstitutionRealm } from '../../../../../../api/model';
import { ApiShopsService } from '../../../../../../api/shop';
import { ShopBalanceModule } from '../../shops-list/shop-balance';
import { ShopsBalanceService } from '../shops-balance/shops-balance.service';
import { FetchShopsService } from './fetch-shops.service';

class MockApiShopsService {
    shops$: Observable<Shop[]>;

    private innerShops$ = new ReplaySubject<Shop[]>(1);
    private mockShops: Shop[];

    constructor() {
        this.shops$ = this.innerShops$.asObservable();
    }

    reloadShops(): void {
        this.innerShops$.next(this.mockShops);
    }

    setMockShops(shops: Shop[]): void {
        this.mockShops = shops;
    }

}

class MockAnalyticsService {
    private innerResponse: InlineResponse200 = {
        result: []
    };

    getGroupBalances(): Observable<InlineResponse200> {
        console.log('getGroupBalances');
        return of(this.innerResponse);
    }

    setMockBalancesResponse(response: InlineResponse200): void {
        this.innerResponse = response;
    }
}

describe('FetchShopsService', () => {
    let service: FetchShopsService;
    let apiShopsService: MockApiShopsService;
    let analyticsService: MockAnalyticsService;
    let balancesService: ShopBalanceModule;

    beforeEach(() => {
        apiShopsService = new MockApiShopsService();
        analyticsService = new MockAnalyticsService();
    })

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FetchShopsService,
                ShopsBalanceService,
                {
                    provide: ApiShopsService,
                    useValue: apiShopsService,
                },
                {
                    provide: AnalyticsService,
                    useValue: analyticsService,
                }
            ]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(FetchShopsService);
        balancesService = TestBed.inject(ShopsBalanceService);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('initRealm', () => {
        it('should init realm and init allShops$ work', () => {
            apiShopsService.setMockShops([
                {
                    id: 'mock1',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock2',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock3',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 3,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                }
            ]);

            const expectedShops$ = cold('a', {
                a: [
                    'mock1',
                    'mock2',
                ]
            })

            apiShopsService.reloadShops();
            service.initRealm(PaymentInstitutionRealm.test);

            expect(service.allShops$.pipe(
                map((list) => {
                    return list.map(({ id }) => id);
                })
            )).toBeObservable(expectedShops$);
        })
    });

    describe('initOffsetIndex', () => {
        it('should init shop$ working', () => {
            apiShopsService.setMockShops([
                {
                    id: 'mock1',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock2',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock3',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock4',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock5',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock6',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock7',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                }
            ]);

            const expectedShops$ = cold('a', {
                a: [
                    'mock1',
                    'mock2',
                    'mock3',
                    'mock4',
                    'mock5',
                ]
            });

            apiShopsService.reloadShops();
            service.initRealm(PaymentInstitutionRealm.test);
            service.initOffsetIndex(3);

            expect(service.loadedShops$.pipe(
                map((list) => {
                    return list.map(({ id }) => id);
                })
            )).toBeObservable(expectedShops$);
        })
    });

    describe('refreshData', () => {
        it('should call apiShopService reload method', () => {
            const spyOnApiShopService = spyOn(apiShopsService, 'reloadShops').and.callThrough();

            service.refreshData();

            expect(spyOnApiShopService).toHaveBeenCalledTimes(1);
        });

        it('should update allShops list', () => {
            apiShopsService.setMockShops([
                {
                    id: 'mock6',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
            ]);

            service.initRealm(PaymentInstitutionRealm.test);
            apiShopsService.reloadShops();

            apiShopsService.setMockShops([
                {
                    id: 'mock6',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                },
                {
                    id: 'mock16',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    },
                    details: {
                        name: 'my name',
                        description: 'some description',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                }
            ]);

            service.refreshData();

            const expectedShops$ = cold('a', {
                a: [
                    'mock6',
                    'mock16',
                ]
            });

            expect(service.allShops$.pipe(
                map((list) => {
                    return list.map(({ id }) => id);
                })
            )).toBeObservable(expectedShops$);
        });

        it('should update loading value', () => {
            apiShopsService.setMockShops([]);

            apiShopsService.reloadShops();
            service.initRealm(PaymentInstitutionRealm.test);
            service.initOffsetIndex(-1);

            service.refreshData();

            expect(service.isLoading$).toBeObservable(cold('a', {
                a: true,
            }));
        });
    })

    describe('showMore', () => {
        it('should update loading value', () => {
            apiShopsService.setMockShops([]);

            apiShopsService.reloadShops();
            service.initRealm(PaymentInstitutionRealm.test);
            service.initOffsetIndex(-1);

            service.showMore();

            expect(service.isLoading$).toBeObservable(cold('a', {
                a: true,
            }));
        });
    })
});
