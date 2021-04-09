import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';
import { generateMockShopsList } from '../../../../tests/generate-mock-shops-list';
import { ShopOptionsSelectionService } from './shop-options-selection.service';

describe('ShopSelectorService', () => {
    let service: ShopOptionsSelectionService;
    let mockFetchShopsService: FetchShopsService;

    const MAIN_CONFIG = {
        providers: [
            ShopOptionsSelectionService,
            {
                provide: FetchShopsService,
                useFactory: () => instance(mockFetchShopsService),
            },
        ],
    };

    function configureTestingModule() {
        TestBed.configureTestingModule(MAIN_CONFIG);
        service = TestBed.inject(ShopOptionsSelectionService);
    }

    beforeEach(() => {
        mockFetchShopsService = mock(FetchShopsService);

        when(mockFetchShopsService.allShops$).thenReturn(of([]));
    });

    describe('creation', () => {
        beforeEach(() => {
            configureTestingModule();
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('options$', () => {
        it('should map Shop objects in BaseOption', () => {
            when(mockFetchShopsService.allShops$).thenReturn(of(generateMockShopsList(3)));

            configureTestingModule();

            const expected$ = cold('(a|)', {
                a: [
                    {
                        id: 'mock_shop_1',
                        label: 'my name',
                    },
                    {
                        id: 'mock_shop_2',
                        label: 'my name',
                    },
                    {
                        id: 'mock_shop_3',
                        label: 'my name',
                    },
                ],
            });

            expect(service.options$).toBeObservable(expected$);
        });
    });

    describe('selectedShop$', () => {
        let expected$;

        afterEach(() => {
            expect(service.selectedShop$).toBeObservable(expected$);
        });

        it('should update selected value with found shop item', () => {
            const mockList = generateMockShopsList(5);
            when(mockFetchShopsService.allShops$).thenReturn(of(mockList));

            configureTestingModule();

            service.control.setValue({
                id: 'mock_shop_2',
                label: 'my name',
            });

            expected$ = cold('a', {
                a: mockList[1],
            });
        });

        it('should set selected value with nullable value if shop id was not found in shops list', () => {
            const mockList = generateMockShopsList(5);
            when(mockFetchShopsService.allShops$).thenReturn(of(mockList));

            configureTestingModule();

            service.control.setValue({
                id: 'mock_shop_12',
                label: 'my name',
            });

            expected$ = cold('a', {
                a: null,
            });
        });
    });
    //
});
