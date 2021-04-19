import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { instance, mock, when } from 'ts-mockito';

import { Shop } from '@dsh/api-codegen/capi/swagger-codegen';
import { AnalyticsService } from '@dsh/api/analytics';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';

import { ShopBalanceModule } from '../../shops-list/shop-balance';
import { generateMockShopsList } from '../../tests/generate-mock-shops-list';
import { MockAnalyticsService } from '../../tests/mock-analytics-service';
import { ShopsBalanceService } from '../shops-balance/shops-balance.service';
import { ShopsFiltersStoreService } from '../shops-filters-store/shops-filters-store.service';
import { ShopsFiltersService } from '../shops-filters/shops-filters.service';
import { FetchShopsService, SHOPS_LIST_PAGINATION_OFFSET } from './fetch-shops.service';

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

describe('FetchShopsService', () => {
    let service: FetchShopsService;
    let apiShopsService: MockApiShopsService;
    let analyticsService: MockAnalyticsService;
    let balancesService: ShopBalanceModule;
    let mockShopsFiltersStoreService: ShopsFiltersStoreService;

    beforeEach(() => {
        apiShopsService = new MockApiShopsService();
        analyticsService = new MockAnalyticsService();
        mockShopsFiltersStoreService = mock(ShopsFiltersStoreService);

        when(mockShopsFiltersStoreService.data$).thenReturn(of({}));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FetchShopsService,
                ShopsBalanceService,
                ShopsFiltersService,
                {
                    provide: ShopsFiltersStoreService,
                    useFactory: () => instance(mockShopsFiltersStoreService),
                },
                {
                    provide: ApiShopsService,
                    useValue: apiShopsService,
                },
                {
                    provide: AnalyticsService,
                    useValue: analyticsService,
                },
                {
                    provide: SHOPS_LIST_PAGINATION_OFFSET,
                    useValue: 5,
                },
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(FetchShopsService);
        // eslint-disable-next-line unused-imports/no-unused-vars
        balancesService = TestBed.inject(ShopsBalanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('initRealm', () => {
        it('should init realm and init allShops$ work', () => {
            apiShopsService.setMockShops(
                generateMockShopsList(3, 1, [
                    {
                        index: 2,
                        categoryID: 2,
                    },
                ])
            );

            const expectedShops$ = cold('a', {
                a: ['mock_shop_1', 'mock_shop_2'],
            });

            apiShopsService.reloadShops();
            service.initRealm(PaymentInstitutionRealm.Test);

            expect(
                service.allShops$.pipe(
                    map((list) => {
                        return list.map(({ id }) => id);
                    })
                )
            ).toBeObservable(expectedShops$);
        });
    });

    describe('initOffsetIndex', () => {
        it('should init shop$ working', () => {
            apiShopsService.setMockShops(generateMockShopsList(7));

            const expectedShops$ = cold('a', {
                a: ['mock_shop_1', 'mock_shop_2', 'mock_shop_3', 'mock_shop_4', 'mock_shop_5'],
            });

            apiShopsService.reloadShops();
            service.initRealm(PaymentInstitutionRealm.Test);
            service.initOffsetIndex(3);

            expect(
                service.shownShops$.pipe(
                    map((list) => {
                        return list.map(({ id }) => id);
                    })
                )
            ).toBeObservable(expectedShops$);
        });
    });

    describe('refreshData', () => {
        beforeEach(() => {
            service.shownShops$.subscribe();
        });

        it('should call apiShopService reload method', () => {
            const spyOnApiShopService = spyOn(apiShopsService, 'reloadShops').and.callThrough();

            service.refreshData();

            expect(spyOnApiShopService).toHaveBeenCalledTimes(1);
        });

        it('should update allShops list', () => {
            apiShopsService.setMockShops(generateMockShopsList(1));

            service.initRealm(PaymentInstitutionRealm.Test);
            apiShopsService.reloadShops();

            apiShopsService.setMockShops(generateMockShopsList(2));

            service.refreshData();

            const expectedShops$ = cold('a', {
                a: ['mock_shop_1', 'mock_shop_2'],
            });

            expect(
                service.allShops$.pipe(
                    map((list) => {
                        return list.map(({ id }) => id);
                    })
                )
            ).toBeObservable(expectedShops$);
        });

        it('should update loading value', () => {
            apiShopsService.setMockShops(generateMockShopsList(2));

            service.initRealm(PaymentInstitutionRealm.Test);
            service.initOffsetIndex(-1);

            apiShopsService.reloadShops();

            expect(service.isLoading$).toBeObservable(
                cold('(ab)', {
                    a: true,
                    b: false,
                })
            );

            service.refreshData();

            expect(service.isLoading$).toBeObservable(
                cold('(ab)', {
                    a: true,
                    b: false,
                })
            );
        });
    });

    describe('showMore', () => {
        beforeEach(() => {
            service.shownShops$.subscribe();
        });

        it('should tick more data', () => {
            const mockList = generateMockShopsList(12);
            const mockListIds = mockList.map(({ id }) => id);
            apiShopsService.setMockShops(mockList);

            service.initRealm(PaymentInstitutionRealm.Test);
            service.initOffsetIndex(-1);
            apiShopsService.reloadShops();

            service.showMore();

            expect(
                service.shownShops$.pipe(
                    map((list) => {
                        return list.map(({ id }) => id);
                    })
                )
            ).toBeObservable(
                cold('a', {
                    a: mockListIds.slice(0, 10),
                })
            );
        });

        it('should update loading value', () => {
            apiShopsService.setMockShops(generateMockShopsList(2));

            service.initRealm(PaymentInstitutionRealm.Test);
            service.initOffsetIndex(-1);

            apiShopsService.reloadShops();

            expect(service.isLoading$).toBeObservable(
                cold('(ab)', {
                    a: true,
                    b: false,
                })
            );

            service.showMore();

            expect(service.isLoading$).toBeObservable(
                cold('(ab)', {
                    a: true,
                    b: false,
                })
            );
        });
    });
});
