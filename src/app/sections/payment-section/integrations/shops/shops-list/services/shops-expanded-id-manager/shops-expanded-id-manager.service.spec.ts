import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';

import { FetchShopsService } from '../../../services/fetch-shops/fetch-shops.service';
import { generateMockShopId } from '../../../tests/generate-mock-shop-id';
import { generateMockShopsList } from '../../../tests/generate-mock-shops-list';
import { MockActivatedRoute } from '../../tests/mock-activated-route';
import { MockFetchShops } from '../../tests/mock-fetch-shops';
import { ShopsExpandedIdManagerService } from './shops-expanded-id-manager.service';

describe('ShopsExpandedIdManagerService', () => {
    let service: ShopsExpandedIdManagerService;

    describe('creation', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    ShopsExpandedIdManagerService,
                    {
                        provide: ActivatedRoute,
                        useFactory: () => new MockActivatedRoute('my_id'),
                    },
                    {
                        provide: FetchShopsService,
                        useFactory: () => new MockFetchShops([]),
                    },
                ],
            });
            service = TestBed.inject(ShopsExpandedIdManagerService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('expandedId$', () => {
        it('should return index position in shops list using fragment id', () => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    ShopsExpandedIdManagerService,
                    {
                        provide: ActivatedRoute,
                        useFactory: () => new MockActivatedRoute(generateMockShopId(3)),
                    },
                    {
                        provide: FetchShopsService,
                        useFactory: () => new MockFetchShops(generateMockShopsList(6)),
                    },
                ],
            });
            service = TestBed.inject(ShopsExpandedIdManagerService);

            const expected$ = cold('(a|)', {
                a: 2,
            });

            expect(service.expandedId$).toBeObservable(expected$);
        });

        it('should return -1 if items was not found in list', () => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    ShopsExpandedIdManagerService,
                    {
                        provide: ActivatedRoute,
                        useFactory: () => new MockActivatedRoute(generateMockShopId(17)),
                    },
                    {
                        provide: FetchShopsService,
                        useFactory: () => new MockFetchShops(generateMockShopsList(6)),
                    },
                ],
            });
            service = TestBed.inject(ShopsExpandedIdManagerService);

            const expected$ = cold('(a|)', {
                a: -1,
            });

            expect(service.expandedId$).toBeObservable(expected$);
        });

        it('should return -1 if id is empty', () => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    ShopsExpandedIdManagerService,
                    {
                        provide: ActivatedRoute,
                        useFactory: () => new MockActivatedRoute(''),
                    },
                    {
                        provide: FetchShopsService,
                        useFactory: () => new MockFetchShops(generateMockShopsList(6)),
                    },
                ],
            });
            service = TestBed.inject(ShopsExpandedIdManagerService);

            const expected$ = cold('(a|)', {
                a: -1,
            });

            expect(service.expandedId$).toBeObservable(expected$);
        });

        it('should return -1 if list is empty', () => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    ShopsExpandedIdManagerService,
                    {
                        provide: ActivatedRoute,
                        useFactory: () => new MockActivatedRoute(generateMockShopId(17)),
                    },
                    {
                        provide: FetchShopsService,
                        useFactory: () => new MockFetchShops([]),
                    },
                ],
            });
            service = TestBed.inject(ShopsExpandedIdManagerService);

            const expected$ = cold('(a|)', {
                a: -1,
            });

            expect(service.expandedId$).toBeObservable(expected$);
        });
    });
});
